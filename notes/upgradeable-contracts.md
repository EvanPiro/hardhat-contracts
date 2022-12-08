# Upgradeable Contracts

## No Constructors allowed
When a contract is deployed, its constructor is ran before anything else. The state that the constructor is writing to is at the address of the contract containing the constructor. The goal of an upgradeable contract is to separate the logic of a contract with its state, thus the constructor betrays this design. In order for the contract to write it's state to another contract, a method needs to be called after the contract has been deployed through the DELEGATE optcode.