import { ethers } from "hardhat";
import axios from "axios";

// This script requires an internet connection and trust in the below URL. Do not use in productions.
async function main() {
  const { data } = await axios.get(
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
  );
  const ethPriceCents = Math.round(data.USD * 100);

  const Forward = await ethers.getContractFactory("Forward");
  const PriceFeed = await ethers.getContractFactory("PriceFeed");
  const twoHoursFromNow = Math.round(new Date().getTime() / 1000) + 60 * 60 * 2;

  const priceFeed = await PriceFeed.deploy(ethPriceCents);

  await priceFeed.deployed();

  const forward = await Forward.deploy(priceFeed.address, twoHoursFromNow, {
    value: ethers.utils.parseEther(".1"),
  });

  await forward.deployed();

  console.log(`forward contract deployed at ${forward.address}`);
  console.log(`price feed deployed at ${priceFeed.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
