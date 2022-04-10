// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { config } from "dotenv";

import { writeFileSync } from "fs";

config();

(async function main() {
  try {
    // await run("compile");

    // Deploying Retro contract
    const RetroContractFactory = await ethers.getContractFactory("Retro");
    const retro = await RetroContractFactory.deploy();
    await retro.deployed();
    console.log("Retro deployed to:", retro.address);

    // Deploying Token contract
    const RMContractFactory = await ethers.getContractFactory("RetroMachine");
    const retroMachine = await RMContractFactory.deploy();
    await retroMachine.deployed();
    console.log("RetroMachine deployed to:", retroMachine.address);
    const config = {
      retroMachine: retroMachine.address,
      retro: retro.address,
    };
    writeFileSync("./output/config.json", JSON.stringify(config));
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
})();
