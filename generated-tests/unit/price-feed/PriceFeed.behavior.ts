import shouldBehaveLikePrice from "./view/_price";
import shouldBehaveLikeOwner from "./view/owner";
import shouldBehaveLikeRenounceOwnership from "./effects/renounceOwnership";
import shouldBehaveLikeSetPrice from "./effects/setPrice";
import shouldBehaveLikeTransferOwnership from "./effects/transferOwnership";

export function shouldBehaveLikePriceFeedContract(): void {
  describe("View Functions", function () {
    describe("#price", function () {
      shouldBehaveLikePrice();
    });
    describe("#owner", function () {
      shouldBehaveLikeOwner();
    });
  });

  describe("Effects Functions", function () {
    describe("#renounceOwnership", function () {
      shouldBehaveLikeRenounceOwnership();
    });
    describe("#setPrice", function () {
      shouldBehaveLikeSetPrice();
    });
    describe("#transferOwnership", function () {
      shouldBehaveLikeTransferOwnership();
    });
  });
}
