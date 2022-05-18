async function main() {
    
    const arbitrage = await ethers.getContractFactory("SimpleArbitrage");
    const arbitrageContract = arbitrage.attach("0x31B0AcD1B952FEF88e263eEE3779f1048c1fB46f");
    console.log("-----------    current contract address ----------------",arbitrageContract.address);
    await arbitrageContract.WithdrawBalance();
}

main()
    .then(() => {
        console.log("complete".green);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
