import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
// import { alchemyApiKey, mnemonic } from "./secret";

const config: HardhatUserConfig = {
  // networks: {
  //   goerli: {
  //     url: `https://eth-goerli.g.alchemy.com/v2/${alchemyApiKey}`,
  //     accounts: { mnemonic },
  //   },
  // },
  solidity: "0.8.17",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
