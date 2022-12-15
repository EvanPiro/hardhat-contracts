import { ethers } from "hardhat";
import axios from "axios";

// This script requires an internet connection and trust in the below URL. Do not use in productions.
async function main() {
  const Contract = await ethers.getContractFactory("SaaS");

  const contract = await Contract.deploy(1_000_000_000, 3600);
  await contract.deployed();

  console.log(`contract deploy to ${contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
