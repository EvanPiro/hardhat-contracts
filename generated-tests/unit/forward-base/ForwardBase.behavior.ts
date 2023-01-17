import shouldBehaveLikeAmount from "./view/_amount";
import shouldBehaveLikeCounterparty from "./view/_counterparty";
import shouldBehaveLikeParty from "./view/_party";
import shouldBehaveLikePrice from "./view/_price";
import shouldBehaveLikePriceFeed from "./view/_priceFeed";
import shouldBehaveLikeUnlockTime from "./view/_unlockTime";
import shouldBehaveLikeAgree from "./effects/agree";
import shouldBehaveLikeInitialize from "./effects/initialize";
import shouldBehaveLikePropose from "./effects/propose";
import shouldBehaveLikeUnlock from "./effects/unlock";

export function shouldBehaveLikeForwardBaseContract(): void {
  describe("View Functions", function () {
    describe("#amount", function () {
      shouldBehaveLikeAmount();
    });
    describe("#counterparty", function () {
      shouldBehaveLikeCounterparty();
    });
    describe("#party", function () {
      shouldBehaveLikeParty();
    });
    describe("#price", function () {
      shouldBehaveLikePrice();
    });
    describe("#priceFeed", function () {
      shouldBehaveLikePriceFeed();
    });
    describe("#unlockTime", function () {
      shouldBehaveLikeUnlockTime();
    });
  });

  describe("Effects Functions", function () {
    describe("#agree", function () {
      shouldBehaveLikeAgree();
    });
    describe("#initialize", function () {
      shouldBehaveLikeInitialize();
    });
    describe("#propose", function () {
      shouldBehaveLikePropose();
    });
    describe("#unlock", function () {
      shouldBehaveLikeUnlock();
    });
  });
}
