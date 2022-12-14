# Libraries

Libraries are basically contracts that do not have state or balances. They have an address and can be loaded by other contracts, which can delegate calls to the library, allowing it to mutate the state of the calling contract. Libraries cannot inherit or be inherited and they cannot be destroyed. 

For instance, the following is an example of a library that provides a simple database implementation and API:
```solidity
pragma solidity ^0.8.17;

struct Database {
    mapping (uint => uint) values;
}

library DatabaseAPI {
    function insert(Database storage self, uint256 key, uint256 val) public {
        self.values[key] = val;
    }
    function lookup(Database storage self, uint256 val) public view returns (uint256) {
        return self.values[val];
    }
}
```
It can be used by a contract if provided the address on deployment. The following is an example of a contract which delegate the logic of its own internal changes to the Database library.
```solidity
pragma solidity ^0.8.17;

import "./DatabaseAPI.sol";

contract Stateful {
    Database db;

    function insert(uint256 key, uint256 val) external {
        DatabaseAPI.insert(db, key, val);
    }

    function lookup(uint256 val) public view returns (uint256) {
        return DatabaseAPI.lookup(db, val);
    }
}
```
In `hardhat`, the library can be deploy as a contract and the address can be loaded into a contract factory instance via the following:
```typescript
  const Contract = await ethers.getContractFactory("Stateful", {
    libraries: { DatabaseAPI: library.address },
  });
```
