# NATSpec Comments
Ethereum Natural Language Specification Format (NatSpec) is a source code commenting format in solidity files that the compiler can use to extract semantic meaning from the code. The following is an example of the available tags that can be used:
```solidity
/**
 * @title Subscription
 * @author Evan Piro
 * @notice The Subscription contract enables an admin to manage subscriptions.
 * @dev A subscription consists of an address and the number of seconds of usage the
 * user has paid. The owner sets the rate in wei per second and the interval,
 * which is the minimum number of seconds a user can purchase.
 */
contract Subscription is Ownable {
    // ...
}
```

[Reference](https://docs.soliditylang.org/en/v0.8.17/natspec-format.html).