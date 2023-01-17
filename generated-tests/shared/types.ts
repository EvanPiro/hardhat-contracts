import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type { Forward } from "../../typechain-types/contracts/Forward";
import type { ForwardBase } from "../../typechain-types/contracts/ForwardBase";
import type { ForwardBaseUpdateTest } from "../../typechain-types/contracts/FowardBaseUpdateTest.sol/ForwardBaseUpdateTest";
import type { PriceFeed } from "../../typechain-types/contracts/PriceFeed";
import type { Subscription } from "../../typechain-types/contracts/Subscription";
import type { TransferFeeToken } from "../../typechain-types/contracts/TransferFeeToken";

type Fixture<T> = () => Promise<T>;

declare module "mocha" {
  export interface Context {
    contracts: Contracts;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Contracts {
  forward: Forward;
  forwardBase: ForwardBase;
  forwardBaseUpdateTest: ForwardBaseUpdateTest;
  priceFeed: PriceFeed;
  subscription: Subscription;
  transferFeeToken: TransferFeeToken;
}

export interface Signers {
  deployer: SignerWithAddress;
  accounts: SignerWithAddress[];
}
