# Upgradeable Contracts

## No Constructors allowed
When a contract is deployed, its constructor is ran before anything else. The state that the constructor is writing to is at the address of the contract containing the constructor. The goal of an upgradeable contract is to separate the logic of a contract with its state, thus the constructor betrays this design. In order for the contract to write it's state to another contract, a method needs to be called after the contract has been deployed through the `DELEGATE` optcode.

## Initializer
Instead of a constructor, an upgradeable contract must have an initializer function which performs the same role.

## Initial Values Caveat
Initial values will be set in the implementation contract and not the proxy contract.
```solidity
contract MyContract {
    uint256 public hasInitialValue = 42; // equivalent to setting in the constructor
}
```
So initial values that are intended to belong to the proxy contract's state should be set in the initialize function like so:
```solidity
contract MyContract is Initializable {
    uint256 public hasInitialValue;

    function initialize() public initializer {
        hasInitialValue = 42; // set initial value in initializer
    }
}
```
[Reference](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable#modifying-your-contracts)

## Parent Contracts
Upgradeable contracts that will be extended need their initializer functions marked with the `onlyInitializing` modifier.

## `selfdestruct` and `delegatecall`

Both are unsafe operations that should be avoided at all costs when writing upgradeable contracts. `selfdestruct` called from a logic contract will destroy the logic contract breaking the operations of all proxies that call the logic contract. Additionally `delegatecall` can be used to call a `selfdestruct` from another contract which will self-destruct the contract call `delegatecall` which in this case is the logic contract.

## Order of State Variables Matters
If you need to add another variable for state, add it to the end of the state variables. Do not modify the variables. They will retain there state.

## Storage Gap Workaround
To get around issues with state variable, openzeppelin supports using the following
```solidity
contract Trivial {
    uint256 public _one;
    uint256 public _two;
    uint256[49] __gap;
}
```
The `__gap` array represents reserved slots in the storage layout of a contract. Each new update to the contract that adds a new state variable will require decrementing the gap size and placing it below the new state variable. Doing this a few times should look something like this:
```solidity
contract TrivialV2 {
    uint256 public _one;
    uint256 public _two;
    uint256 public _three;
    uint256 public _four;
    uint256 public _five;
    address public _party;
    address public _party1;
    uint128 public _six;
    uint256[43] __gap;
}
```
Note that each data type as its own rules for how it's stored in gap.

[Reference](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable#storage-gaps)