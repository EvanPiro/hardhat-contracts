import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("TransferFeeToken", function () {
  const supply = 10000;
  const feeBips = 500;
  async function launchContract() {
    const [sender, feeCollector, other] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("TransferFeeToken");
    const contract = await Contract.deploy(
      "TransferFeeToken",
      "TNT",
      supply,
      feeBips,
      feeCollector.address
    );
    await contract.deployed();
    return {
      contract,
      sender,
      other,
      feeCollector,
    };
  }
  describe("Constructor", function () {
    it("launches with initial supply sent to sender", async function () {
      const { contract, sender } = await loadFixture(launchContract);
      expect(await contract.balanceOf(sender.address)).to.equal(supply);
    });
  });
  describe("Transfer", function () {
    it("sends fees to fee collector and amount after fees to receiver", async function () {
      const { contract, sender, feeCollector, other } = await loadFixture(
        launchContract
      );

      const amount = 1000;
      const fee = (feeBips * amount) / 10_000;
      const amountAfterFees = amount - fee;

      await expect(
        await contract.transfer(other.address, amount)
      ).to.changeTokenBalances(
        contract,
        [sender, other, feeCollector],
        [-amount, amountAfterFees, fee]
      );
    });
  });
});
