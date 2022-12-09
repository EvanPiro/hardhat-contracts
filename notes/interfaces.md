# Interfaces

The purpose of interfaces are to give an implementing contract requirements around the function and types of the ABI it's supporting.

- It must mark all functions it declares as external.
- It can only inherit from other interfaces and not contracts.
- It cannot do the following:
  - inherit from other contracts
  - declare state variables
  - declare a constructor
  - declare modifiers

