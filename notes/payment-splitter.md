# The Payment Splitter Contract
The payment splitter contract controls the withdrawal of a portion of tokens (ETH and ERC20) that the contract has been sent. It does this through a system of shares where the users portion of the payout is proportional to their allocation of the shares tracked in the contract.  

Anyone can trigger a payout by called the `receive` method with the address of the person owed funds. If the address is owed funds, the method will send the funds to that address.
