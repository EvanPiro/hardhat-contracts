// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

/**
 * @title TransferFeeToken
 * @author Evan Piro
 * @notice This contract supports adding a fee to all token transfer operations of an ERC20 token.
 * @dev
 * Fees are implemented by requiring contract constructor to have a fee collector address and the
 * integer amount of basis points to calculate the fee. On transfer, the fee is calculated and
 * deducted from the amount to transfer. It is sent to the fee collector address and the remaining
 * tokens are sent to the specified recipient.
 */
contract TransferFeeToken is ERC20 {
    uint256 _feeBasisPoints;
    address _feeCollector;

    event FeePaid(uint256 amount);

    /**
     * @dev Sets the default values of the base ERC20 constructor along with the initial amount of
     * tokens to mint and send to the user constructing the contract, the transfer fee in basis
     * points, and the address of the account that will receive the fees.
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 amount,
        uint256 feeBasisPoints,
        address feeCollector
    ) ERC20(name_, symbol_) {
        _feeBasisPoints = feeBasisPoints;
        _feeCollector = feeCollector;
        _mint(msg.sender, amount);
    }

    /**
     * @dev Override the base transfer operations and adds fee calculation and collection.
     */
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        uint256 _fee = (amount * _feeBasisPoints) / 10_000;
        uint256 _remaining = amount - _fee;
        super._transfer(from, _feeCollector, _fee);
        super._transfer(from, to, _remaining);
    }
}
