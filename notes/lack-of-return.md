# Lack of Return
Functions are allowed to omit the return value specified in the type declaration. The result of calling the function is the default value. In the case of below, calling `exists()` will be false.
```solidity

function exists() public returns(bool) {
    
}
```
[Reference](https://github.com/ethereum/solidity/issues/4751)