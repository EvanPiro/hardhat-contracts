pragma solidity ^0.8.16;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";

contract MyBeaconProxy is BeaconProxy {
    constructor(
        address beacon,
        bytes memory data
    ) payable BeaconProxy(beacon, data) {}
}
