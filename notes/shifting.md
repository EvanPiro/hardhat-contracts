# Shifting
Solidity supports the following shifting operations when arithmetic can be factored as such:
## Left shift `<<`
Left shifting is an efficient means for multiplying a number by 2 to the n power.

```solidity
6 << 1 // is equal to 6 * 2
6 << 3 // is equal to 6 * 2 * 2 * 2
```
This is essentially just shifting the binary of the number over by n bits.
```
0000 0110 -> 0000 1100 
```
## Right Shift
Right shifting is the inverse.
```solidity
6 >> 1 // is equal to 6 / 2
16 >> 3 // is equal to 6 / (2 * 2 * 2)
```
This is just shifting the bits rigthward.
```
0000 1100 -> 0000 0110 
```