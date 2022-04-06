// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { config } from "dotenv";

config();

(async function main() {
  try {
    // await run("compile");

    // Deploying Retro contract
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
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
})();
