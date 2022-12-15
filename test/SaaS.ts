import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";

describe("SaaS", function () {
  async function launchContract(rate: number, interval: number) {
    const [owner, subscriber, other] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("SaaS");

    const contract = await Contract.deploy(rate, interval);
    await contract.deployed();
    return {
      contract,
      owner,
      subscriber,
      other,
    };
  }

  describe("Deploy", function () {
    it("disallows rate of 0", async function () {
      const Contract = await ethers.getContractFactory("SaaS");
      await expect(Contract.deploy(0, 1)).revertedWith(
        "Rate must be greater than 0"
      );
    });
    it("disallows interval of 0", async function () {
      const Contract = await ethers.getContractFactory("SaaS");
      await expect(Contract.deploy(1, 0)).revertedWith(
        "Interval must be greater than 0"
      );
    });
    it("launches with rate and interval set", async function () {
      const { contract } = await loadFixture(
        launchContract.bind(null, 1, 3000)
      );

      expect((await contract._rate()).toString()).to.equal("1");
      expect((await contract._interval()).toString()).to.equal("3000");
    });
    it("is owned by deploying account", async function () {
      const { contract, owner } = await loadFixture(
        launchContract.bind(null, 1000, 1000)
      );
      expect((await contract.owner()).toString()).to.equal(owner.address);
    });
  });
  describe("IsPaidUp", function () {
    it("returns false if the subscriber hasn't paid up to the current time", async function () {
      const { contract, subscriber } = await loadFixture(
        launchContract.bind(null, 1, 1)
      );
      await contract.connect(subscriber).pay({ value: 1000 });
      await time.increase(2000);
      expect(await contract.isPaidUp(subscriber.address)).to.equal(false);
    });
    it("returns false if the subscriber is not found", async function () {
      const { contract, other } = await loadFixture(
        launchContract.bind(null, 1000, 1000)
      );
      expect(await contract.isPaidUp(other.address)).to.equal(false);
    });
    it("returns true if user has paid up to the current time", async function () {
      const { contract, subscriber } = await loadFixture(
        launchContract.bind(null, 1, 1)
      );
      await contract.connect(subscriber).pay({ value: 1000 });
      expect(await contract.isPaidUp(subscriber.address)).to.equal(true);
    });
  });
  describe("Pay", function () {
    it("reverts if fee is below interval", async function () {
      const { contract, subscriber } = await loadFixture(
        launchContract.bind(null, 1, 2)
      );

      await expect(contract.connect(subscriber).pay({ value: 1 })).revertedWith(
        "Fee times the rate must be greater than the interval"
      );
    });
    it("accepts fee if interval or above", async function () {
      const { contract, subscriber } = await loadFixture(
        launchContract.bind(null, 1, 1)
      );

      await contract.connect(subscriber).pay({ value: 1000 });

      expect(await contract.isPaidUp(subscriber.address)).to.equal(true);
    });
  });
  describe("Collect", function () {
    it("transfers entire contract balance to owner", async function () {
      const { contract, subscriber, owner } = await loadFixture(
        launchContract.bind(null, 1, 1)
      );

      await contract.connect(subscriber).pay({ value: 1000 });

      expect(contract.collect()).changeEtherBalance(owner, 1000);
    });
  });
  describe("GetAddressByIndex", function () {
    it("gets no address from a non-existent index", async function () {
      const { contract, subscriber } = await loadFixture(
        launchContract.bind(null, 1, 1)
      );

      await expect(contract.getAddressByIndex(0)).revertedWith(
        "Subscriber not found"
      );
    });
    it("gets an address from an existing index", async function () {
      const { contract, subscriber, other } = await loadFixture(
        launchContract.bind(null, 1, 1)
      );

      await contract.connect(subscriber).pay({ value: 1000 });

      await expect(await contract.getAddressByIndex(0)).to.equal(
        subscriber.address
      );
    });
  });
});
