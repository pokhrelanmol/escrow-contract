import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
const config: HardhatUserConfig = {
    solidity: "0.8.17",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545",
            chainId: 31337,
        },
        goerli: {
            url: process.env.GOERLI_RPC_URL,
            accounts: [process.env.PRIVATE_KEY as string],
        },
        tenderly: {
            url: process.env.TENDERLY_FORK_RPC,
            accounts: [process.env.PRIVATE_KEY as string],
        },
    },
    paths: {
        artifacts: "./frontend/src/artifacts",
    },
};

export default config;
