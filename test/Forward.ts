import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { BigNumber, utils } from "ethers";

describe("Forward", function () {
  async function setUpDeploy(price: number) {
    const PriceFeed = await ethers.getContractFactory("PriceFeed");
    const Forward = await ethers.getContractFactory("Forward");
    const priceFeed = await PriceFeed.deploy(price);
    return {
      priceFeed,
      Forward,
    };
  }
  async function setUpContract(
    value: BigNumber,
    unlockTime: number,
    price: number
  ) {
    const [party, counterparty, other] = await ethers.getSigners();
    const { priceFeed, Forward } = await setUpDeploy(price);
    const forward = await Forward.deploy(priceFeed.address, unlockTime, {
      value,
    });
    return {
      priceFeed,
      forward,
      party,
      counterparty,
      other,
    };
  }
  async function setUpLocked(
    value: BigNumber,
    unlockTime: number,
    price: number
  ) {
    const { priceFeed, forward, party, counterparty, other } =
      await setUpContract(value, unlockTime, price);
    await forward.connect(counterparty).agree({ value });
    return { priceFeed, forward, party, counterparty, other };
  }
  async function setUpUnlockable(
    value: BigNumber,
    oldPrice: number,
    newPrice: number
  ) {
    const timeUntil = (await time.latest()) + 60 * 60 * 2;
    const { priceFeed, forward, party, counterparty, other } =
      await setUpLocked(value, timeUntil, oldPrice);
    await priceFeed.setPrice(newPrice);
    await time.increaseTo(timeUntil);
    return { priceFeed, forward, party, counterparty, other };
  }
  describe("Rejected Deployment", function () {
    it("rejects hedged value below 0.1 eth", async function () {
      const { priceFeed, Forward } = await loadFixture(
        setUpDeploy.bind(null, 1000)
      );
      const unlockTime = await time.latest();

      await expect(
        Forward.deploy(priceFeed.address, unlockTime, {
          value: utils.parseEther("0.09"),
        })
      ).to.revertedWith("Amount to hedge must be at least 0.1 ETH");
    });
    it("rejects an unlock time less than an hour from now", async function () {
      const { priceFeed, Forward } = await loadFixture(
        setUpDeploy.bind(null, 1000)
      );

      await expect(
        Forward.deploy(priceFeed.address, await time.latest(), {
          value: utils.parseEther("0.1"),
        })
      ).to.revertedWith("Unlock time must be at least an hour from now");
    });
  });
  describe("Deployment", function () {
    it("sets the party", async function () {
      const unlockTime = (await time.latest()) + 60 * 60 * 2;

      const { forward, party } = await loadFixture(
        setUpContract.bind(null, utils.parseEther(".1"), unlockTime, 1000)
      );
      expect(await forward._party()).to.equal(party.address);
    });
    it("allows setting the unlock time an hour or more from now", async function () {
      const unlockTime = (await time.latest()) + 60 * 60 * 2;

      const { forward } = await loadFixture(
        setUpContract.bind(null, utils.parseEther(".1"), unlockTime, 1000)
      );
      expect(await forward._unlockTime()).to.equal(unlockTime);
    });
    it("captures the price from the PriceFeeder", async function () {
      const unlockTime = (await time.latest()) + 60 * 60 * 2;

      const { forward } = await loadFixture(
        setUpContract.bind(null, utils.parseEther(".1"), unlockTime, 1000)
      );
      expect(await forward._price()).to.equal(1000);
    });
    it("cannot call initialize after contract is initialized", async function () {
      const unlockTime = (await time.latest()) + 60 * 60 * 2;

      const { forward, priceFeed } = await loadFixture(
        setUpContract.bind(null, utils.parseEther(".1"), unlockTime, 1000)
      );
      await expect(forward.initialize(priceFeed.address)).revertedWith(
        "Initializable: contract is already initialized"
      );
    });
    it("emits the ForwardOpened event", async function () {
      const { Forward, priceFeed } = await loadFixture(
        setUpDeploy.bind(null, 1000)
      );
      const unlockTime = (await time.latest()) + 60 * 60;

      expect(
        Forward.deploy(priceFeed.address, unlockTime, {
          value: utils.parseEther("0.1"),
        })
      ).emit(Forward, "ForwardOpened");
    });
  });

  describe("Agree", function () {
    it("rejects a value not matching the hedged amount", async function () {
      const unlockTime = (await time.latest()) + 60 * 60 * 2;
      const { priceFeed, forward, party } = await loadFixture(
        setUpContract.bind(null, utils.parseEther(".1"), unlockTime, 1000)
      );

      await expect(
        forward.agree({ value: utils.parseEther(".05") })
      ).revertedWith("Sent value does not match hedge value");
    });
    it("allows setting the counterparty", async function () {
      const unlockTime = (await time.latest()) + 60 * 60 * 2;
      const { priceFeed, forward, party, counterparty } = await loadFixture(
        setUpContract.bind(null, utils.parseEther(".1"), unlockTime, 1000)
      );
      await forward
        .connect(counterparty)
        .agree({ value: utils.parseEther(".1") });
      expect(await forward._counterparty()).to.equal(counterparty.address);
    });
    it("emits the ForwardLocked event", async function () {
      const unlockTime = (await time.latest()) + 60 * 60 * 2;
      const { forward } = await loadFixture(
        setUpContract.bind(null, utils.parseEther(".1"), unlockTime, 1000)
      );
      await expect(forward.agree({ value: utils.parseEther(".1") })).emit(
        forward,
        "ForwardLocked"
      );
    });
  });
  describe("Unlock", function () {
    it("reverts if current timestamp is before allowed time", async function () {
      const unlockTime = (await time.latest()) + 60 * 60 * 2;
      const { forward } = await loadFixture(
        setUpLocked.bind(null, utils.parseEther(".1"), unlockTime, 1000, false)
      );

      await expect(forward.unlock()).revertedWith("Not yet time to unlock.");
    });
    it("refunds both parties if price hasn't changed", async function () {
      const { forward, party, counterparty } = await loadFixture(
        setUpUnlockable.bind(null, utils.parseEther("1"), 1, 1)
      );
      await expect(await forward.unlock()).changeEtherBalances(
        [party, counterparty],
        [utils.parseEther("1"), utils.parseEther("1")]
      );
    });
    it("sends the full contract balance to hedging party if price is 0", async function () {
      const { forward, party, counterparty } = await loadFixture(
        setUpUnlockable.bind(null, utils.parseEther("1"), 10, 0)
      );
      await expect(await forward.unlock()).changeEtherBalances(
        [party, counterparty],
        [utils.parseEther("2"), utils.parseEther("0")]
      );
    });
    it("sends full contract balance to hedging party if price drops by half", async function () {
      const { forward, party, counterparty } = await loadFixture(
        setUpUnlockable.bind(null, utils.parseEther("1"), 10, 5)
      );
      await expect(await forward.unlock()).changeEtherBalances(
        [party, counterparty],
        [utils.parseEther("2"), utils.parseEther("0")]
      );
    });
    it("gives counterparty half of what hedging party put in if price doubles", async function () {
      const { forward, party, counterparty } = await loadFixture(
        setUpUnlockable.bind(null, utils.parseEther("1"), 10, 20)
      );
      await expect(await forward.unlock()).changeEtherBalances(
        [party, counterparty],
        [utils.parseEther(".5"), utils.parseEther("1.5")]
      );
    });
    it("emits the HedgeUnlocked event", async function () {
      const { forward, party, counterparty } = await loadFixture(
        setUpUnlockable.bind(null, utils.parseEther("1"), 10, 20)
      );
      await expect(forward.unlock()).emit(forward, "ForwardUnlocked");
    });
  });
});
