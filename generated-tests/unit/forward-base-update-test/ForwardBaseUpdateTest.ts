import { shouldBehaveLikeForwardBaseUpdateTestContract } from "./ForwardBaseUpdateTest.behavior";
import { forwardBaseUpdateTestFixture } from "./ForwardBaseUpdateTest.fixture";

export function testForwardBaseUpdateTest(): void {
  describe("ForwardBaseUpdateTest", function () {
    beforeEach(async function () {
      const { forwardBaseUpdateTest } = await this.loadFixture(
        forwardBaseUpdateTestFixture
      );
      this.contracts.forwardBaseUpdateTest = forwardBaseUpdateTest;
    });

    shouldBehaveLikeForwardBaseUpdateTestContract();
  });
}
