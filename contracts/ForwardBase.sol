// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {PriceFeed} from "./PriceFeed.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @title Forward
 * @author Evan Piro
 * @notice This contract supports setting up a forward agreement with a party hedging against the price of ETH and a
 * counterparty to counter the hedge.
 * @dev
 * The following steps are implemented:
 * 1. Party A sends n ETH. The current USD price of ETH, p0, is captured.
 * 2. Party B sends n ETH. The funds are now locked until the unlock time.
 * 4. At unlock time, get the current price, p1, and send p0 * n / p1 to A and the rest to B.
 *
 * This is an implementation of [the proposed hedge contract in the ethereum whitepaper](https://ethereum.org/en/whitepaper/#financial-derivatives-and-stable-value-currencies)
 */
contract ForwardBase is Initializable {
    address payable public _party;
    address payable public _counterparty;
    uint public _amount;
    uint public _unlockTime;
    uint public _price;
    PriceFeed public _priceFeed;

    event ForwardOpened();
    event ForwardLocked();
    event ForwardUnlocked();

    /**
     * @dev This sets the PriceFeed from the provided address to initialize the contract.
     */
    function initialize(address priceFeedAddress) public initializer {
        _priceFeed = PriceFeed(priceFeedAddress);
    }

    /**
     * @dev Begins the `Hedge` agreement where a price feeder is set for sourcing the price
     * data that determines the allocation of the resulting hedge, and an unlockTime in seconds is
     * set to specify UTC time the contract will be unlocked.
     *
     * The ETH value that is sent by the hedging party initiating the contract is saved to storage and
     * must be matched by the counterparty in the contract for the contract to lock.
     *
     * The current USD price of ETH is saved to the contract, locking the hedging party into
     */
    function propose(uint unlockTime) public payable {
        require(
            msg.value >= 100_000_000 gwei,
            "Amount to hedge must be at least 0.1 ETH"
        );
        require(
            unlockTime >= block.timestamp + (60 * 60),
            "Unlock time must be at least an hour from now"
        );

        _party = payable(msg.sender);
        _amount = msg.value;
        _unlockTime = unlockTime;
        _price = _priceFeed._price();

        emit ForwardOpened();
    }

    /**
     * @dev By calling this method and sending a quantity of ETH matching the hedging party's amount
     * the transacting user becomes a counter party, launching the hedging agreement at the price set
     * on the opening of the contract for the duration determined by the unlocke time set by the
     * hedging party.
     */
    function agree() external payable {
        require(msg.value == _amount, "Sent value does not match hedge value");
        _counterparty = payable(msg.sender);

        emit ForwardLocked();
    }

    /**
     * @dev Anyone can call the unlock method, which checks to see if the unlock time of the agreement
     * has been reached and if so it calculates the USD amount of ETH that was locked at the price
     * captured when the agreement began and takes that USD amount and the current price of ETH to
     * calculate the quantity of ETH that could be purchase with that amount. That quantity of ETH
     * is sent to the party that initiated the contract while the remaining ETH is sent to the
     * counterparty.
     */
    function unlock() external {
        require(block.timestamp >= _unlockTime, "Not yet time to unlock.");
        uint256 _newPrice = _priceFeed._price();
        uint256 _contractBalance = address(this).balance;
        if (_newPrice == 0) {
            AddressUpgradeable.sendValue(_party, _contractBalance);
            emit ForwardUnlocked();
        } else {
            uint256 _partyValue = (_amount * _price) / _priceFeed._price();
            if (_partyValue > _contractBalance) {
                AddressUpgradeable.sendValue(_party, _contractBalance);
            } else {
                AddressUpgradeable.sendValue(_party, _partyValue);
            }
            AddressUpgradeable.sendValue(_counterparty, address(this).balance);
            emit ForwardUnlocked();
        }
    }
}
