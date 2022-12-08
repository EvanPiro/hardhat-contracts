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
