# Abstract Contracts
An abstract contract is a contract that provides one or more methods that are not implemented. A non-implement method is a function definition without a body i.e `{}`. 

Note that the method without a body needs to be marked as `virtual`.
```solidity
abstract contract Lockable {
    function lock() virtual public;
}
```
The implementing contract will need to mark the function it's implementing with `override`:
```solidity
contract Lock is Lockable {
    function lock() public override {
    }
}
```
Not that if the implementing contract were to not implement all of the functions in the abstract contract, the implementing contract will need to be marked as abstract.
[Reference]("@openzeppelin/contracts-upgradeable": "^4.8.0")