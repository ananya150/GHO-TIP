// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../test/GHO.sol";

contract Extractor{

    GHO usdc;

    constructor (address _usdc){
        usdc = GHO(_usdc);
    }
    
    function extract(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s,
        uint256 amount
    ) public {
        usdc.permit(owner, address(this), value, deadline, v, r, s);
        usdc.transferFrom(owner, spender, amount);
    }

}