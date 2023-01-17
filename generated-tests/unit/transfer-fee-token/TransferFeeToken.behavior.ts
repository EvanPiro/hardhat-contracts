import shouldBehaveLikeAllowance from "./view/allowance";
import shouldBehaveLikeBalanceOf from "./view/balanceOf";
import shouldBehaveLikeDecimals from "./view/decimals";
import shouldBehaveLikeName from "./view/name";
import shouldBehaveLikeSymbol from "./view/symbol";
import shouldBehaveLikeTotalSupply from "./view/totalSupply";
import shouldBehaveLikeApprove from "./effects/approve";
import shouldBehaveLikeDecreaseAllowance from "./effects/decreaseAllowance";
import shouldBehaveLikeIncreaseAllowance from "./effects/increaseAllowance";
import shouldBehaveLikeTransfer from "./effects/transfer";
import shouldBehaveLikeTransferFrom from "./effects/transferFrom";

export function shouldBehaveLikeTransferFeeTokenContract(): void {
  describe("View Functions", function () {
    describe("#allowance", function () {
      shouldBehaveLikeAllowance();
    });
    describe("#balanceOf", function () {
      shouldBehaveLikeBalanceOf();
    });
    describe("#decimals", function () {
      shouldBehaveLikeDecimals();
    });
    describe("#name", function () {
      shouldBehaveLikeName();
    });
    describe("#symbol", function () {
      shouldBehaveLikeSymbol();
    });
    describe("#totalSupply", function () {
      shouldBehaveLikeTotalSupply();
    });
  });

  describe("Effects Functions", function () {
    describe("#approve", function () {
      shouldBehaveLikeApprove();
    });
    describe("#decreaseAllowance", function () {
      shouldBehaveLikeDecreaseAllowance();
    });
    describe("#increaseAllowance", function () {
      shouldBehaveLikeIncreaseAllowance();
    });
    describe("#transfer", function () {
      shouldBehaveLikeTransfer();
    });
    describe("#transferFrom", function () {
      shouldBehaveLikeTransferFrom();
    });
  });
}
