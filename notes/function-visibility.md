# Function Visibility
After the arguments statement of the function, the following visiblity settings are required. This tells the compiler if an EVM message call should be made

| Type     | Used by   | 
|----------|---           |
| external | current, derived, any contract, non-contract |
| public   | current, derived, any contract |
| internal | current, derived |
| private  | current |

## External vs Public
When calling a function from within the contract it is defined, when the function is marked as `external`, it needs to be called with `this` like so:
```solidity
pragma solidity ^0.8.17;

contract GetPublic {
    function get() external {

    }
    function callGet() public {
        this.get();
    }
}
```
When the function is marked as `public`, it can be called with both `this` and without.

```solidity
pragma solidity ^0.8.17;

contract GetPublic {
    function get() public {

    }
    function callGet() public {
        get();
    }
}
```