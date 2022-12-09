pragma solidity ^0.8.17;

import "./ForwardBase.sol";

contract ForwardBaseUpdateTest is ForwardBase {
    function updated() public pure returns(uint256) {
        return 200;
    }
}
