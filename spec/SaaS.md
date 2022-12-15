# Software as a Service Contract (SaaS)

The following spec describes a contract that supports a subscription based service where subscribers pay for intervals of time. 

## Users

### Admin
Admin is the user that owns the contract. There is only one admin. Ownership is transferable.

### Subscriber
A subscriber is a user that has purchased a quantity of time to use the service associated with the contract. There are many subscribers per SaaS contract. The amount of time the subscriber has purchased is tracked by seconds in the contracts subscriptions mapping. For example if the admin wants a monthly fee of .05 ETH, then the seconds would be saved at the equivalent amount of `19,290,123,456.8` wei / second, and `interval` would be equal to the approximate number of seconds in a month i.e `60 * 60 * 24 * 30`

## Contract Parameters
-  `owner`: The address of the owner of the contract.
- `rate`: Amount of wei per second.
- `interval`: Minimum number of seconds a user can purchase. 


## Contract State
- subscriptions: (`address` => `paidUntil`)
  - This reflects the current payment status of the subscriber. If current block time is greater than `paidUntil`, the account is not paid up. This can also be used to calculate how much the subscriber owes services that were performed after the subscription has expired via `(block.time - paidUntil) * rate`.

## Public Functions
- `isPaidUp`: Address -> Bool
  - Looks up the `paidUntil` of the calling account.
  - If the `paidUntil` is greater than the current block time return false. Else return true.
- `pay`:
  - Takes the quantity of wei from `msg.value`, converts it to time via `msg.value * rate`, checks it against `interval`. If is less than, revert transaction. If it is greater than, increment the sending address's `paidUntil` by that amount.
- `collect`
  - Sends the balance of the contract to the admin account. 