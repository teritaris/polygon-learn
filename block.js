const { Network, Alchemy } = require("alchemy-sdk");
const API_KEY = process.env.API_KEY

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
    apiKey: API_KEY, // Replace with your Alchemy API Key.
    network: Network.MATIC_MUMBAI, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const txHash = "0x57e95595460a4ed6fccee2c231a062b9f1c0d2113d4aec6cd7d196a1d0804b22"

async function main() {
    const latestBlock = await alchemy.core.getBlockNumber();
    console.log("The latest block number is", latestBlock);

    const tx = await alchemy.core.getTransaction(txHash);
    console.dir(tx)


    await alchemy.core.sendTransaction
}

main();
