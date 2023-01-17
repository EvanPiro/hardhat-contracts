import shouldBehaveLikeInterval from "./view/_interval";
import shouldBehaveLikeRate from "./view/_rate";
import shouldBehaveLikeSubscriptions from "./view/_subscriptions";
import shouldBehaveLikeGetAddressByIndex from "./view/getAddressByIndex";
import shouldBehaveLikeIsPaidUp from "./view/isPaidUp";
import shouldBehaveLikeOwner from "./view/owner";
import shouldBehaveLikeCollect from "./effects/collect";
import shouldBehaveLikePay from "./effects/pay";
import shouldBehaveLikeRenounceOwnership from "./effects/renounceOwnership";
import shouldBehaveLikeTransferOwnership from "./effects/transferOwnership";

export function shouldBehaveLikeSubscriptionContract(): void {
  describe("View Functions", function () {
    describe("#interval", function () {
      shouldBehaveLikeInterval();
    });
    describe("#rate", function () {
      shouldBehaveLikeRate();
    });
    describe("#subscriptions", function () {
      shouldBehaveLikeSubscriptions();
    });
    describe("#getAddressByIndex", function () {
      shouldBehaveLikeGetAddressByIndex();
    });
    describe("#isPaidUp", function () {
      shouldBehaveLikeIsPaidUp();
    });
    describe("#owner", function () {
      shouldBehaveLikeOwner();
    });
  });

  describe("Effects Functions", function () {
    describe("#collect", function () {
      shouldBehaveLikeCollect();
    });
    describe("#pay", function () {
      shouldBehaveLikePay();
    });
    describe("#renounceOwnership", function () {
      shouldBehaveLikeRenounceOwnership();
    });
    describe("#transferOwnership", function () {
      shouldBehaveLikeTransferOwnership();
    });
  });
}
