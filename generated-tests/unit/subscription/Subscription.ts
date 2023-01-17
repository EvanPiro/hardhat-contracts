import { shouldBehaveLikeSubscriptionContract } from "./Subscription.behavior";
import { subscriptionFixture } from "./Subscription.fixture";

export function testSubscription(): void {
  describe("Subscription", function () {
    beforeEach(async function () {
      const { subscription } = await this.loadFixture(subscriptionFixture);
      this.contracts.subscription = subscription;
    });

    shouldBehaveLikeSubscriptionContract();
  });
}
