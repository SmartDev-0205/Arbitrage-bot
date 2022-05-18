async function main() {
    // get network
    let [owner] = await ethers.getSigners();
    console.log(owner.address);
    let network = await owner.provider._networkPromise;

    const arbitrage = await ethers.getContractFactory("SimpleArbitrage");
    const PanckakeSwapRouter = "0x10ed43c718714eb63d5aa57b78b54704e256024e";
    const BarkerySwapRouter = "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7";
    const DaiAddress = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
    const arbitrageContract = await arbitrage.deploy(PanckakeSwapRouter,BarkerySwapRouter,DaiAddress);
    await arbitrageContract.deployed();
    let contractAddress = arbitrageContract.address;
    console.log("------deployed contract-------------",contractAddress);
    await owner.sendTransaction({
        to: contractAddress,
        value: ethers.utils.parseEther("0.1"), // Sends exactly 1.0 ether
      });
 
    // arbitrageContract = new ethers.Contract("0x32cfef68587467526276d1e78259878bd43849a6",abi,owner)
    // console.log("-----------    current contract address ----------------",arbitrageContract.address);

    let tradeAmount = ethers.utils.parseEther("0.1");
    console.log("------------- trade amount ----------------",tradeAmount);
    await arbitrageContract.makeArbitrage(tradeAmount);
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
