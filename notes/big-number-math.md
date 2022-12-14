# Big Number Math
Due to how large ETH is in comparison to the smallest unit of value, the wei (10e18), `ethers` exposes its  `BigNumber` type. The following is an example of how to perform arithmetic on a `BigNumber` in `typescript`. 

```typescript
import { BigNumber } from "ethers";

const amountToSplit = 1_000_000_000;

const res = BigNumber.from(amountToSplit)
  .mul(20)
  .div(10 + 20)
```