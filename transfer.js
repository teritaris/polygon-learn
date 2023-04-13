// Imports the Alchemy SDK
const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");
const dotenv = require("dotenv");
dotenv.config();

const API_KEY = process.env.API_KEY

// Configures the Alchemy SDK
const config = {
    apiKey: API_KEY, // Replace with your API key
    network: Network.MATIC_MUMBAI, // Replace with your network
};

// Creates an Alchemy object instance with the config to use for making requests
const alchemy = new Alchemy(config);

const amount = 0.001;

// .envの中のACCOUNT[num]_PRIVATE_KEYのキーを全て抜き出す
const pluckPrivateKeyViaEnv = (env) => {
    const pkeyEnvKeys = Object.keys(env).filter((key) => {
        return key.match(/ACCOUNT[1-9]|[1-4][0-9]_PRIVATE_KEY/)
    });
    return pkeyEnvKeys;
}


/**
 * .envのキーがCCOUNT[num]_PRIVATE_KEYのアカウント全てからToに同じ数量のMATICを送付する
 */
const main = () => {
    const pkeyEnvKeys = pluckPrivateKeyViaEnv(process.env);

    for (const pKey of pkeyEnvKeys) {
        sendTransaction(new Wallet(process.env[pKey]));
    }
}

const sendTransaction = async (wallet) => {
    const transaction = {
        to: "0x6e2d241c2D136004D6e192CDcEA066251F886349",
        value: Utils.parseEther(amount.toString()),
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
    main()
})();
