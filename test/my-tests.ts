import { expect } from "chai";
import { ethers } from "hardhat";
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Lock", function () {
  async function launchYearLock() {
    const lockedAmount = 1_000_000_000;
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // deploy a lock contract where funds can be withdrawn
    // one year in the future
    const Lock = await ethers.getContractFactory("Lock");
    const [admin, otherAccount] = await ethers.getSigners();
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
    return {
      lock,
      unlockTime,
      lockedAmount,
      admin,
      otherAccount,
    };
  }

  it("Should set the right unlockTime", async function () {
    const { lock, unlockTime, lockedAmount } = await loadFixture(
      launchYearLock
    );

    // assert that the value is correct
    expect(await lock.unlockTime()).to.equal(unlockTime);
  });
  it("Should revert with the right error if called too soon", async function () {
    const { lock, unlockTime, lockedAmount } = await loadFixture(
      launchYearLock
    );

    // ...deploy the contract as before...

    await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
  });

  it("Should send the funds to the owner on unlock", async function () {
    const { lock, unlockTime, lockedAmount, admin } = await loadFixture(
      launchYearLock
    );

    await time.increaseTo(unlockTime);

    await expect(lock.withdraw()).to.changeEtherBalance(admin, lockedAmount);
  });

  it("Should prevent the withdrawal from non-admin", async function () {
    const { lock, unlockTime, otherAccount } = await loadFixture(
      launchYearLock
    );

    await time.increaseTo(unlockTime);
    await lock.withdraw();

    await expect(lock.connect(otherAccount).withdraw()).revertedWith(
      "You aren't the owner"
    );
  });

  it("should emit the withdraw event when a withdrawal is made", async function () {
    const { lock, unlockTime, otherAccount } = await loadFixture(
      launchYearLock
    );

    await time.increaseTo(unlockTime);
    await expect(lock.withdraw()).to.emit(lock, "Withdrawal");
  });
});
