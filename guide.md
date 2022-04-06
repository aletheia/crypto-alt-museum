# Step-by-step guide to create project with Hardhat

This is a step by step guide to be followed to implement a new project with Hardhat.

## Install and create new project
Install Hardhat

```bash
    npm install -g hardhat
```

Initialize new project with Hardhat

```bash
    hardhat init
```
Select Sample Hardhat project with Typescript

Add in script to your package.json

```json
  "scripts": {
    "accounts": "hardhat accounts",
    "clean": "hardhat clean",
    "test": "hardhat test",
    "node": "hardhat node",
    "help": "hardhat help",
    "cover": "hardhat cover",
    "lint": "eslint '**/*.{js,ts}' --fix",
    "prettier": "prettier '**/*.{json,sol,md}' --write",
    "compile": "hardhat compile",
    "solhint": "solhint '**/*.sol' --fix",
    "deploy": "hardhat run scripts/deploy.ts",
    "deploy:ropsten": "hardhat run scripts/deploy.ts --network ropsten"
  },
```

## Create a new contract named Retro, which is an ERC20 token

Add a new file with the following code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



/// @custom:security-contact info@compvter.it
contract Retro is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("Retro", "RTO") {         
        _mint(msg.sender, 100000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function sendTokenTo(address to, uint256 amount) public onlyOwner {
        _transfer(msg.sender, to, amount);
    }

    function burnTokens(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount);
    }
}
```

Instantiate the contract factory and deploy the contract, adding the following code to scripts/deploy.ts

```typescript
    const RetroContractFactory = await ethers.getContractFactory("Retro");
    const retro = await RetroContractFactory.deploy();

    await retro.deployed();
    console.log("Greeter deployed to:", retro.address);

    // Minting a token
    const { WALLET_ADDRESS } = process.env;
    if (!WALLET_ADDRESS) {
      throw new Error("WALLET_ADDRESS is not set");
    }
    console.log("Minting tokens to the owner address");
    retro.mint(WALLET_ADDRESS, 100);
```



