import { shouldBehaveLikeForwardContract } from "./Forward.behavior";
import { forwardFixture } from "./Forward.fixture";

export function testForward(): void {
  describe("Forward", function () {
    beforeEach(async function () {
      const { forward } = await this.loadFixture(forwardFixture);
      this.contracts.forward = forward;
    });

    shouldBehaveLikeForwardContract();
  });
}
