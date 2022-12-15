pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SaaS is Ownable {
    mapping(address => uint256) public _subscriptions;
    uint256 public _rate;
    uint256 public _interval;

    constructor(uint256 rate, uint256 interval) public {
        require(rate > 0, "Rate must be greater than 0");
        require(interval > 0, "Interval must be greater than 0");
        _rate = rate;
        _interval = interval;
    }

    function isPaidUp(address subscriber) public view returns (bool) {
        return block.timestamp < _subscriptions[subscriber];
    }

    function pay() public payable {
        require(
            msg.value * _rate >= _interval,
            "Fee times the rate must be greater than the interval"
        );
        _subscriptions[msg.sender] = block.timestamp + _interval;
    }

    function collect() public {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }
}
