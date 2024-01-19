// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract GHO is ERC20, ERC20Permit {
    constructor() ERC20("GHO", "GHO") ERC20Permit("GHO") {
        _mint(msg.sender, 10000 * (10**18));
    }
}