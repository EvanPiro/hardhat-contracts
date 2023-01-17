import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import { alchemyApiKey, mnemonic } from "./secret";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-test-suite-generator";

const config = {
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${alchemyApiKey}`,
      accounts: { mnemonic },
    },
  },
  solidity: "0.8.17",
  paths: {
    sources: "./contracts",
    tests: "./generated-tests",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  testSuiteGenerator: {
    outDirName: "generated-tests",
  },
};

export default config;
