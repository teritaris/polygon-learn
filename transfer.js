// Imports the Alchemy SDK
const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");
const dotenv = require("dotenv");
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_KEY = process.env.API_KEY

// Configures the Alchemy SDK
const config = {
    apiKey: API_KEY, // Replace with your API key
    network: Network.MATIC_MUMBAI, // Replace with your network
};

// Creates an Alchemy object instance with the config to use for making requests
const alchemy = new Alchemy(config);
const wallet = new Wallet(PRIVATE_KEY);

const execute = async () => {
    const transaction = {
        to: "0x6e2d241c2D136004D6e192CDcEA066251F886349",
        value: Utils.parseEther("0.001"),
        gasLimit: "21000",
        maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
        maxFeePerGas: Utils.parseUnits("20", "gwei"),
        nonce: await alchemy.core.getTransactionCount(wallet.getAddress()),
        type: 2,
        chainId: 80001,
    };

    const rawTransaction = await wallet.signTransaction(transaction);
    const response = await alchemy.transact.sendTransaction(rawTransaction)

    console.log(response)
}


(async () => {
    await execute();
})();
