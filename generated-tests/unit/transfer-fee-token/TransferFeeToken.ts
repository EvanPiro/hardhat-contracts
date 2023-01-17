import { shouldBehaveLikeTransferFeeTokenContract } from "./TransferFeeToken.behavior";
import { transferFeeTokenFixture } from "./TransferFeeToken.fixture";

export function testTransferFeeToken(): void {
  describe("TransferFeeToken", function () {
    beforeEach(async function () {
      const { transferFeeToken } = await this.loadFixture(
        transferFeeTokenFixture
      );
      this.contracts.transferFeeToken = transferFeeToken;
    });

    shouldBehaveLikeTransferFeeTokenContract();
  });
}
