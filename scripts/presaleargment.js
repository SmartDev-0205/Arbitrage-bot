var terms = {
    vestingPrice: 30000 * 1000000, // 300000 QE/ETH // 1e6
    vestingPeriod: 20 * 24 * 3600, // 20 days
    price: 3000 * 1000000 // 3000 QE/ETH // 1e6
}

terms.vestingPeriod += Number(((new Date()) / 1000).toFixed(0));
console.log(terms);
module.exports = [
    "0x120Fe8d30De994d5808Bc150Ec87506F7004114b", "0x8D3e85e15cC9b1F0809fa698c4Ba66571a1b779D", terms
];