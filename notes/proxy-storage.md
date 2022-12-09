# Proxy Storage of Implementation Address
## The problem
A proxy contract needs to store the address of its implementation contract somewhere but does not want it to be at risk of being overwritten.

## The solution
A random slot is chosen to store the address. The probability of collision is low enough that the risk of being overwritten is minuscule. This eliminates the need to have the implementation contract know about the storage layout of the proxy contract.

[Reference](https://eips.ethereum.org/EIPS/eip-1967).