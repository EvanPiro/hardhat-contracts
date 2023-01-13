# Tests Generation
## Steps
1. Generate file heading
```typescript
import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
```

2. Generate contract loading function
```typescript
async function launchContract() {
  const [owner, other] = await ethers.getSigners();
  const Contract = await ethers.getContractFactory("ContractName");
  const contract = await Contract.deploy();
  await contract.deployed();
  return {
    contract,
    owner,
    other,
  }
}
```

3. Get public method names from ABI
```typescript
describe("Contract.sol", function () {
  describe("MethodName", function () {
    
  })
  describe("MethodName", function () {

  })
  // ...
});
```

4. Fill in `describe` blocks with `it` assertions for event tests:

```typescript
it("<add an assertion>", async function () {
    const { contract } = await loadFixture(launchPriceFeeder);
    expect(false)
      .to.equal(true)
});
```