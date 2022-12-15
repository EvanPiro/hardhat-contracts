// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PriceFeed
 * @author Evan Piro
 * @notice You can use this contract for setting up an on-chain price feed data source.
 * @dev The `PriceFeed` contract creates a data source for USD value of ETH to be
 * used on-chain. The current implementation relies on a trusted operator.
 */
contract PriceFeed is Ownable {
    uint256 public _price;
    event PriceUpdated(uint256 price);

    /**
     * @dev Initializes the price with a USD value of ETH price. This sets the ownership
     * of the contract to the account that created it.
     */
    constructor(uint256 price) Ownable() {
        _price = price;
    }

    /**
     * @dev Updates the price. This is only callable by the account that created this
     * contract.
     */
    function setPrice(uint256 price) external onlyOwner {
        _price = price;
        emit PriceUpdated(_price);
    }
}
