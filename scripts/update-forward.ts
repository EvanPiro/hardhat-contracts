import { ethers, upgrades } from "hardhat";
import axios from "axios";

async function main() {
  const ForwardBaseV2 = await ethers.getContractFactory("ForwardBaseV2");
  await upgrades.upgradeProxy(
    "0x0B306BF915C4d645ff596e518fAf3F9669b97016",
    ForwardBaseV2
  );
  console.log("forward upgraded");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
