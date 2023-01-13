# Contracts
A collection of solidity contracts and tests.

## Commands
```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/pricefeed-and-forward.ts
```

## For development with Nix
```
nix develop

# @TODO move env var into shell expression
HARDHAT_EXPERIMENTAL_ALLOW_NON_LOCAL_INSTALLATION=true npx hardhat test
```

## Goerli Instances
- [Subscription Contract](https://goerli.etherscan.io/address/0xdf5de56B46A8045f46691E0B6573DaD2C6Be8e79)
- [Price Feed Contract](https://goerli.etherscan.io/address/0xb80EB65E780699Cd434Efe525C0aAba4d82c74D7)
- [Forward Contract](https://goerli.etherscan.io/address/0x35d4Bad2B2E36226fbEd825e54Ca04252d413365)
- [Transfer Fee Token Contract](https://goerli.etherscan.io/token/0xAAa1badE9f4Cf514bbB76B1666836DDc75fb914f)