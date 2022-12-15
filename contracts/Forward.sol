// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ForwardBase.sol";

/**
 * @title Forward
 * @dev ForwardBase but with a constructor
 */
contract Forward is ForwardBase {
    constructor(
        address priceFeedAddress,
        uint unlockTime
    ) payable ForwardBase() {
        initialize(priceFeedAddress);
        propose(unlockTime);
    }
}
