# Transparent Proxies Pattern

## The Problem
In order to make a proxy contract upgradeable, it needs to expose an upgrade function that is not delegated to the logic contract. By default, all requests to a proxy contract are delegated so there needs to be a condition that allows the call to avoid delegation. 

## The Solution
A condition is added that checks if the interacting account is a known upgrade admin. If so, the calls to the contract are not delegated. This is solved in `@openzeppelin/upgrades-plugin` by deploying a `ProxyAdmin` contract that an approved deploying account can call to perform the upgrade. This allows the deploying user to continue using their account to interact with the proxies like a regular user and to reserve the circumvention of the delegation to the admin contract. The `ProxyAdmin` contract inherits from `Ownable` so ownership can be transferred.