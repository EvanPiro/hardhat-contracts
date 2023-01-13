# Inheritance
When writing contracts, it's important to understand that references to methods in derived contracts may not be referentially transparent. For example, in `Final.destroy()`, the `super.destroy()` which calls `Base2.destroy()` may seem like it's calling `Destructable.destroy()` but it's actually calling `Base1.destroy()`. A good rule to follow when troubleshooting inheritance issues is to look at the `override(...)` on the method and to apply the scope right to left, where `super` refers to the next left contract.
```solidity
contract owned {
    constructor() { owner = payable(msg.sender); }
    address payable owner;
}

contract Destructible is owned {
    function destroy() virtual public {
        if (msg.sender == owner) selfdestruct(owner);
    }
}

contract Base1 is Destructible {
    function destroy() public virtual override { /* do cleanup 1 */ super.destroy(); }
}

contract Base2 is Destructible {
    function destroy() public virtual override { /* do cleanup 2 */ super.destroy(); }
}

contract Final is Base1, Base2 {
    function destroy() public override(Base1, Base2) { super.destroy(); }
}
```

A useful pattern to follow when leveraging inheritance is overriding an internal function on the base contract 
that is used to implement a behavior throughout the public API of the contract.

```solidity
pragma solidity ^0.8.0;

contract BaseOverrideTest {
    function addTwo() public view returns (uint) {
        return sharedMethod() + 2;
    }
    function addTwelve() public view returns (uint) {
        return sharedMethod() + 12;
    }
    function sharedMethod() internal view virtual returns (uint) {
        return 5;
    }
}

contract OverrideTest is BaseOverrideTest {
    function sharedMethod() internal view override returns (uint){
        return 1000;
    }
    // OverrideTest can now call `addTwo()` and `addThree` with the 1000 applied.
}
```

The overriding of `sharedMethod` results in the behavior of `addTwo` and `addThree` changing without having to write  
a new declaration of both functions. This is particularly useful when changing the behaviors of a token contract such as 
ERC20, where the deriving contract can just modify the behavior of `_transfer` to change the behaviors of all of the
methods used in the API that transfer tokens.
