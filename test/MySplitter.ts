import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { BigNumber } from "ethers";

describe("MySplitter", function () {
  async function twoUserContract(
    amountToSplit: number,
    user1Share: number,
    user2Share: number
  ) {
    const Contract = await ethers.getContractFactory("MySplitter");
    const [user1, user2, userWithNoShares] = await ethers.getSigners();
    const contract = await Contract.deploy(
      [user1.address, user2.address],
      [user1Share, user2Share]
    );
    await user1.sendTransaction({
      to: contract.address,
      from: user1.address,
      value: amountToSplit,
    });

    return {
      contract,
      user1,
      user2,
      user1Share,
      user2Share,
      userWithNoShares,
      amountToSplit,
    };
  }
  describe("Deployment", function () {
    it("Should set the users", async function () {
      const amountToSplit = 1_000_000_000;
      const { contract, user1, user2, user1Share, user2Share } =
        await loadFixture(twoUserContract.bind(null, 1_000_000_000, 10, 20));

      expect(await contract.payee(0)).to.equal(user1.address);
      expect(await contract.payee(1)).to.equal(user2.address);
    });
    it("Should set the shares", async function () {
      const amountToSplit = 1_000_000_000;
      const { contract, user1, user2, user1Share, user2Share } =
        await loadFixture(twoUserContract.bind(null, amountToSplit, 10, 20));
      const user1SetShares = await contract.shares(user1.address);
      const user2SetShares = await contract.shares(user2.address);

      expect(user1SetShares).to.equal(10);
      expect(user2SetShares).to.equal(20);
      expect(await contract.totalShares()).to.equal(30);
    });
  });
  describe("Pay Splitting", function () {
    it("Should tell user how much they can release", async function () {
      const amountToSplit = 1_000_000_000;
      const { contract, user1, user2, user1Share, user2Share } =
        await loadFixture(twoUserContract.bind(null, amountToSplit, 10, 20));

      const user1Pay = await contract["releasable(address)"](user1.address);
      const user2Pay = await contract["releasable(address)"](user2.address);

      expect(user1Pay).to.equal(
        BigNumber.from(amountToSplit)
          .mul(10)
          .div(10 + 20)
      );
      expect(user2Pay).to.equal(
        BigNumber.from(amountToSplit)
          .mul(20)
          .div(10 + 20)
      );
    });
    it("pays the user their share", async function () {
      const amountToSplit = 1_000_000_000;
      const { contract, user1, user2, user1Share, user2Share } =
        await loadFixture(twoUserContract.bind(null, amountToSplit, 10, 20));
      await expect(
        contract["release(address)"](user1.address)
      ).changeEtherBalance(
        user1,
        BigNumber.from(amountToSplit)
          .mul(10)
          .div(10 + 20)
      );
    });
    it("does not payout to a user with no shares", async function () {
      const amountToSplit = 1_000_000_000;
      const { contract, userWithNoShares } = await loadFixture(
        twoUserContract.bind(null, amountToSplit, 10, 20)
      );

      await expect(
        contract["release(address)"](userWithNoShares.address)
      ).revertedWith("PaymentSplitter: account has no shares");
    });
    it("does not payout to an account not owed funds", async function () {
      const amountToSplit = 1_000_000_000;
      const { contract, user1 } = await loadFixture(
        twoUserContract.bind(null, amountToSplit, 10, 20)
      );

      await contract["release(address)"](user1.address);

      await expect(contract["release(address)"](user1.address)).revertedWith(
        "PaymentSplitter: account is not due payment"
      );
    });
  });
});
