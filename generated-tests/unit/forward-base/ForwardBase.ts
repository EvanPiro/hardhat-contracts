import { shouldBehaveLikeForwardBaseContract } from "./ForwardBase.behavior";
import { forwardBaseFixture } from "./ForwardBase.fixture";

export function testForwardBase(): void {
  describe("ForwardBase", function () {
    beforeEach(async function () {
      const { forwardBase } = await this.loadFixture(forwardBaseFixture);
      this.contracts.forwardBase = forwardBase;
    });

    shouldBehaveLikeForwardBaseContract();
  });
}
