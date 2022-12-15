# Two's Compliment
Signed integers in two's compliment are represented as positive counting up from 0 and negatives counting down from 2<sup>bits</sup> - 1, where they meet in the middle at a `-0` point. By representing positive and negative numbers this way, you can calculate the binary for a negative and positive number interchangeably by flipping the 1s and 0s and adding 1, called "taking the two's compliment". For example, `5`, which is `0101` in 4 bit int can be made into `-5` by flipping everything to `1010` and then adding `1`: `1011`.

Another convenient characteristic of two's compliment is that the addition of a positive number and it's negative equivalent will always equal the overflow value which wraps back to zero when unchecked. For example, 1 (`0001`) + -1 (`1111`) = `10000` = `0000`.
## 4 Bit Signed Integers

binary  | integer |   
---- | --- |   
0000 |  0  |    
0001 |  1  |   
0010 |  2  |   
0011 |  3  |   
0100 |  4  |   
0101 |  5  |   
0110 |  6  |   
0111 |  7  |
1000 |  - 0  |
1001 |  - 7  |
1010 |  - 6  |
1011 |  - 5  |
1100 |  - 4  |
1101 |  - 3  |
1110 |  - 2  |
1111 |  - 1  |

[Reference](https://stackoverflow.com/questions/1049722/what-is-2s-complement).

 







