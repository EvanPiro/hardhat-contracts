# Constructors
Inheritance order will occur right to left on the contract line regardless of the order on the constructor. For example:

```solidity
// Constructors are executed in the following order:
//  1 - Base1
//  2 - Base2
//  3 - Derived1
contract Derived1 is Base1, Base2 {
    constructor() Base1() Base2() {}
}

// Constructors are executed in the following order:
//  1 - Base2
//  2 - Base1
//  3 - Derived2
contract Derived2 is Base2, Base1 {
    constructor() Base2() Base1() {}
}

// Constructors are still executed in the following order:
//  1 - Base2
//  2 - Base1
//  3 - Derived3
contract Derived3 is Base2, Base1 {
    constructor() Base1() Base2() {}
}
```

## More on Inheritance

The following does not work because the constructor of `C` needs to be redefined by the extending contract `CExt` in order for `CExtChild` to use it:
```solidity
contract C {
    uint id;
    constructor(uint _id) {
        id = _id;
    }
}

contract CExt is C {

}

/**
error[7927]: TypeError: Wrong argument count for constructor call: 1 arguments given but expected 0. Remove parentheses if you do not want to provide arguments here.
 --> src/CBaseExt.sol:18:23:
**/

contract CExtChild is CExt(1) {
}

```
