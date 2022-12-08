# Testing

## Fixtures
Tests with hardhat can be made more organized and performant by employing `loadFixtures(<function>)`, which takes a function that performs a state change to the test network and undoes its effect each time it is called.
```typescript
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";


describe("tests", function() {
  async function performEffect() {
    // Do onchain operations
    return { /* data from operation */}
  }
  it("should behave a certain way", async function(){
    const {/* data from operation} */} = await loadFixture(
      performEffect
    )
    // expect code
  })

  it("should not behave a certain way", async function(){
    const {/* data from operation} */} = await loadFixture(
      performEffect
    )
    // expect code
  })
})
```

## Testing Transaction Reverts
When a transaction is expected to fail, you can test that the transaction is reverted with the `revertedWith` assertion, like the following:
```typescript
await expect(/* forbidden action */).revertedWith("Expected message")
```

## Testing Events
When an event is emitted from a transaction, you can check for the event in the results via:
```typescript
await expect(/* action */).to.emit(contract, "<Event Name>")
```
Additionally, `.withArgs(/* value */)` can be added if the event is parameterized.

[Reference](https://hardhat.org/hardhat-chai-matchers/docs/reference#.emit)

## Testing Balance Changes
You can test that a balance has changed in ETH or in ERC20 but running the following:
```typescript
await expect(/* action */).to.changeEtherBalance(account, amount)
await expect(/* action */).to.changeEtherBalances([account1, account2], [amount, -amount])
```

## Moving Time
You can change the blockchain time to force contract behaviors like the following:
```typescript
import { time } from "@nomicfoundation/hardhat-network-helpers";
const currentBlockTime = await time.latest();
const hourFromNow = currentBlockTime + 60 * 60
await time.increaseTo(hourFromNow)
```