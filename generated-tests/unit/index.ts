import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";

import type { Contracts, Signers } from "../shared/types";
import { testForward } from "./forward/Forward";
import { testForwardBase } from "./forward-base/ForwardBase";
import { testForwardBaseUpdateTest } from "./forward-base-update-test/ForwardBaseUpdateTest";
import { testPriceFeed } from "./price-feed/PriceFeed";
import { testSubscription } from "./subscription/Subscription";
import { testTransferFeeToken } from "./transfer-fee-token/TransferFeeToken";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;
    this.contracts = {} as Contracts;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.deployer = signers[0];
    this.signers.accounts = signers.slice(1);

    this.loadFixture = loadFixture;
  });

  testForward();
  testForwardBase();
  testForwardBaseUpdateTest();
  testPriceFeed();
  testSubscription();
  testTransferFeeToken();
});
