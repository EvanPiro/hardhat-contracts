# Address

An address is a 20 byte value representing an Ethereum address.

Addresses can be converted from `uint160`, integer literals, `bytes20`, and contract types. 
## Payable
If an address is going to be sent funds in a contract, it must be set explicitly to `payable` via:
```solidity
payable(<address>);

payable(0); // also allowed but an exception.
```

## Members of Addresses
A address has a `balance` property containing its current ETH balance and a `transfer` function which transfers a value from the current balance.
```solidity
address payable receiver = payable(0x123);
address contractAddress = address(this); // Gets the address of the current contract
if (receiver.balance < 10 && contractAddress.balance >= 10) receiver.transfer(10); // Send contract balance to receiver
```

[Reference](https://docs.soliditylang.org/en/v0.8.17/types.html?highlight=adress%20payable#address).