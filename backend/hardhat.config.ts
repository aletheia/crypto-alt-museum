import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

const {
  WALLET_PRIVATE_KEY,
  ETHERSCAN_API_KEY,
  ROPSTEN_ALCHEMY_URL,
  RINKEBY_ALCHEMY_URL,
  REPORT_GAS,
} = process.env;

if (!WALLET_PRIVATE_KEY || !RINKEBY_ALCHEMY_URL || !ROPSTEN_ALCHEMY_URL) {
  throw new Error(
    "Please set the WALLET_PRIVATE_KEY and ALCHEMY_URL environment variable to your wallet private key"
  );
}

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [WALLET_PRIVATE_KEY],
    },
    ropsten: {
      url: ROPSTEN_ALCHEMY_URL,
      accounts: [WALLET_PRIVATE_KEY],
    },
    rinkeby: {
      url: RINKEBY_ALCHEMY_URL,
      accounts: [WALLET_PRIVATE_KEY],
    },
  },
  gasReporter: {
    enabled: REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
