const { expect } = require("chai");
const fs = require("fs");
const { ethers } = require("hardhat");
const ERC20ABI = require("../artifacts/contracts/ERC20.sol/ERC20.json").abi;
const PresaleABI =
	require("../artifacts/contracts/presale.sol/Presale.json").abi;

const { delay, fromBigNum, toBigNum } = require("./utils.js")

var owner;
var network;

var tokenContract;
var presaleContract;

var userWallet;


describe("deploy contracts", function () {
	it("Create account", async function () {
		[owner,addr1,addr2] = await ethers.getSigners();
		console.log("This is owner address : ",owner.address);
		var tx = await owner.sendTransaction({
			to: addr1.address,
			value: ethers.utils.parseUnits("100", 18)
		});
		await tx.wait();
		
	});

	it("deploy contracts", async function () {
		//QE token deployment
		const ERC20TOKEN = await ethers.getContractFactory("ERC20");
		tokenContract = await ERC20TOKEN.deploy("QEToken", "QE");
		await tokenContract.deployed();

		//presale deployment
		var terms = {
			vestingPrice: 30000 * 1000000, // 300000 QE/ETH // 1e6
			vestingPeriod: 20 * 24 * 3600, // 20 days
			price: 3000 * 1000000 // 3000 QE/ETH // 1e6
		}
		const PresaleContract = await ethers.getContractFactory("Presale");
		presaleContract = await PresaleContract.deploy(tokenContract.address, owner.address, terms);
	})
});



describe("contracts test", function () {

	it("send token to add1", async () => {
		let result = await tokenContract.transfer(addr1.address,10000000000);
		let add1Blance = await  tokenContract.balanceOf(addr1.address);
		console.log("Token transfer result :",add1Blance);
	});

	it("set airdrop", async () => {
		await tokenContract.setAirdrop(addr1.address,10000000000);
		let add1Blance = await  tokenContract.balanceOf(addr1.address);
		console.log("Token airdrop result",add1Blance);
	});

	it("test transfer for airdrop", async () => {
		await tokenContract.connect(addr1).transfer(addr2.address, 10000000000);
		let add1Blance = await  tokenContract.balanceOf(addr1.address);
		console.log("Token airdrop result",add1Blance);
	});
	
	

	// it("Get owner", async () => {
	// 	let ownerAddress = await tokenContract.getOwner();
	// 	// console.log("This is owner address =========",ownerAddress);
	// });

	// it("set airdrop", async () => {
	// 	let result = await tokenContract.setAirdrop(addr1.address,10000);
	// 	let ownerAddress = await tokenContract.getOwner();
	// 	console.log("---------------------------",ownerAddress);
	// 	let ownerBlance = await tokenContract.balanceOf(ownerAddress);
	// 	let add1Blance = await  tokenContract.balanceOf(addr1.address);
	// 	console.log(ownerBlance,add1Blance);
	// });


	// it("get airdrop account", async () => {
	// 	let amount = await tokenContract.getAirdrop(addr1.address);
	// 	console.log(addr1.address,amount)
	// });

	// it("buy", async () => {
	// 	var initAmount = await tokenContract.balanceOf(addr1.address);
	// 	console.log("init amount ========>",initAmount,addr1.address);
	// 	presaleContract.connect(addr1);
	// 	var tx = await presaleContract.buy({ value: toBigNum("0.001", 18) });
	// 	await tx.wait();
	// 	var cAmount = await tokenContract.balanceOf(addr1.address);
	// 	console.log("token  amount",cAmount,addr1.address);
	// 	// expect(cAmount.sub(initAmount)).to.be.equal(toBigNum("30000", 18));
	// })
});

// describe("contracts test", function () {
// 	it("transfer", async () => {
// 		var tx = await tokenContract.transfer(presaleContract.address, toBigNum("1000000", 18));
// 		await tx.wait();
// 	});

// 	it("buy", async () => {
// 		var initAmount = await tokenContract.balanceOf(addr1.address);
// 		console.log("init amount ========>",initAmount,addr1.address);
// 		presaleContract.connect(addr1);
// 		var tx = await presaleContract.buy({ value: toBigNum("0.001", 18) });
// 		await tx.wait();
// 		var cAmount = await tokenContract.balanceOf(addr1.address);
// 		console.log("token  amount",cAmount,addr1.address);
// 		// expect(cAmount.sub(initAmount)).to.be.equal(toBigNum("30000", 18));
// 	})
// });


