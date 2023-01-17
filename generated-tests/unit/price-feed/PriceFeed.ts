import { shouldBehaveLikePriceFeedContract } from "./PriceFeed.behavior";
import { priceFeedFixture } from "./PriceFeed.fixture";

export function testPriceFeed(): void {
  describe("PriceFeed", function () {
    beforeEach(async function () {
      const { priceFeed } = await this.loadFixture(priceFeedFixture);
      this.contracts.priceFeed = priceFeed;
    });

    shouldBehaveLikePriceFeedContract();
  });
}
