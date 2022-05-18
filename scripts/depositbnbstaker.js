const fs = require("fs");
const colors = require("colors");
const { ethers } = require("hardhat");
const BNBStakerAbi =
    require("../artifacts/contracts/bnbStaker.sol/BNBStaker.json").abi;

async function main() {
    // get network
    var [owner] = await ethers.getSigners();

    let network = await owner.provider._networkPromise;

    const BNBSTAKERTOKEN = await ethers.getContractFactory("BNBStaker");
    const tokenContract = await BNBSTAKERTOKEN.deploy();
    await tokenContract.deployed();

    // deployment r esult
    var contractObject = {
        token: {
            address: tokenContract.address,
            abi: BNBStakerAbi
        }
    }

    fs.writeFileSync(
        `./build/bnbstaker-${network.chainId}.json`,
        JSON.stringify(contractObject, undefined, 4)
    );
}

main()
    .then(() => {
        console.log("complete".green);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });