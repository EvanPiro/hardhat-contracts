import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("PriceFeeder", function () {
  async function launchPriceFeeder() {
    const [owner, other] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("PriceFeed");
    const contract = await Contract.deploy(1000);
    await contract.deployed();
    return {
      contract,
      owner,
      other,
    };
  }
  it("launches with initial price set", async function () {
    const { contract } = await loadFixture(launchPriceFeeder);
    expect(await contract._price()).to.equal(1000);
  });
  it("shows new price when price is updated", async function () {
    const { contract } = await loadFixture(launchPriceFeeder);
    await contract.setPrice(2000);
    expect(await contract._price()).to.equal(2000);
  });
  it("prevents non-admin from updating the price", async function () {
    const { contract, other } = await loadFixture(launchPriceFeeder);
    await expect(contract.connect(other).setPrice(2000)).revertedWith(
      "Ownable: caller is not the owner"
    );
  });
  it("emits PriceUpdate event when price is updated", async function () {
    const { contract } = await loadFixture(launchPriceFeeder);
    expect(contract.setPrice(2000))
      .to.emit(contract, "PriceUpdate")
      .withArgs(3000);
  });
});
