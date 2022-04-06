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
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
})();
