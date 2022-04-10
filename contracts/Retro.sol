// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



/// @custom:security-contact info@compvter.it
contract Retro is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("Retro", "RTO") {         
        _mint(msg.sender, 1000*10**18);
    }

    

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function sendTokenTo(address to, uint256 amount) public {
        transfer(to, amount^10**18);
    }

    function burnTokens(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount^10**18);
    }
}