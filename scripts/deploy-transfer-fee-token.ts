import { ethers } from "hardhat";

async function main() {
  const Contract = await ethers.getContractFactory("TransferFeeToken");

  const [myAddress] = await ethers.getSigners();

  const contract = await Contract.deploy(
    "Transfer Fee Token",
    "TFT",
    10_000_000,
    500,
    myAddress.address
  );
  await contract.deployed();

  console.log(`contract deploy to ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
