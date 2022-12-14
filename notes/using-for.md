# Using `for`

The syntax `using { <a> }  for <b>` can be used to bind functions to a type such that the functions can be called on the type via `<type of b>.<function a>()`. The function must be defined with its first argument as a value of the type of `<b>`. The following code demonstrates how this is done:
```solidity
pragma solidity ^0.8.17;

struct Data {
    mapping(uint => uint) data;
}

using {insert} for Data;

function insert(Data storage self, uint key, uint val) {
    self.data[key] = val;
}

function get(Data storage self, uint key) view returns (uint) {
    return self.data[key];
}

contract UsingFor {
    Data data;

    function putUrl(uint val) public {
        data.data[123] = val;
    }

    function getUrl() public view returns (uint) {
        return data.data[123];
    }
}
```
Additionally, the syntax can be `using <a> for <b>` where `<a>` is the name of a library and `<b>` is a type that the library exposes function with `<b>` as the first argument, like following:

Library file:
```solidity
pragma solidity ^0.8.17;

    struct SingleNum { uint num; }

library ForLib {
    function setNum(SingleNum storage self, uint val) public {
        self.num = val;
    }
    function getNum(SingleNum storage self) public view returns(uint) {
        return self.num;
    }
}
```

Contract file:
```solidity
pragma solidity ^0.8.17;

import "./ForLib.sol";

using ForLib for SingleNum;

contract UsingFor {
    SingleNum data;

    constructor() {
        data.setNum(80999);
    }

    function get() public view returns (uint) {
        return data.getNum();
    }
}
```