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


