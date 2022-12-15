// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev The SaaS contract enables an admin to manage subscriptions.
 *
 * A subscription consists of an address and the number of seconds of usage the
 * user has paid. The owner sets the rate in wei per second and the interval,
 * which is the minimum number of seconds a user can purchase.
 */
contract SaaS is Ownable {
    mapping(address => uint256) public _subscriptions;
    uint256 public _rate;
    uint256 public _interval;
    address[] addresses;

    /**
     * @dev The user that constructs the contract becomes the owner,
     * must provide the rate, which is wei per second to charge for service,
     * and the interval, which is the minimum seconds to purchase for service.
     */
    constructor(uint256 rate, uint256 interval) public Ownable() {
        require(rate > 0, "Rate must be greater than 0");
        require(interval > 0, "Interval must be greater than 0");
        _rate = rate;
        _interval = interval;
    }

    /**
     * @dev `isPaidUp`` checks if a subscriber has paid the per second charge
     * until the current block time.
     */
    function isPaidUp(address subscriber) public view returns (bool) {
        return block.timestamp < _subscriptions[subscriber];
    }

    /**
     * @dev `pay` handles the payment for services. The payer must pay a full
     * interval price.
     */
    function pay() public payable {
        require(
            msg.value * _rate >= _interval,
            "Fee times the rate must be greater than the interval"
        );
        addresses.push(msg.sender);
        _subscriptions[msg.sender] = block.timestamp + _interval;
    }

    /**
     * @dev `collect` handles the sending of collected fees to the owner account.
     * This can be called by any user.
     */
    function collect() public {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    /**
     * @dev `getAddressByIndex` allows a user to get the address of a subscriber
     * by an index. This is designed for SaaS services that want to aggregate
     * user data.
     */
    function getAddressByIndex(uint index) public view returns (address) {
        require(index < addresses.length, "Subscriber not found");
        return addresses[index];
    }
}
