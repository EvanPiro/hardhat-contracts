import { ethers, upgrades } from "hardhat";
import axios from "axios";

// This script requires an internet connection and trust in the below URL. Do not use in productions.
async function main() {
  const { data } = await axios.get(
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
  );
  const ethPriceCents = Math.round(data.USD * 100);

  const ForwardBase = await ethers.getContractFactory("ForwardBase");
  const PriceFeed = await ethers.getContractFactory("PriceFeed");

  const priceFeed = await PriceFeed.deploy(ethPriceCents);

  await priceFeed.deployed();

  const forward = await upgrades.deployProxy(ForwardBase, [priceFeed.address], {
    initializer: "initialize",
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
