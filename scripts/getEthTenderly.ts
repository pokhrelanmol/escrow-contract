import { ethers } from "hardhat";

const getEth = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc.tenderly.co/fork/334b326d-3544-4f1e-b6dc-0812bfcc8daa"
    );
    console.log(provider);
    const params = [
        ["0x0B00724e15F6BF596F42908598EEf7C6a089233E"],
        ethers.utils.hexValue(ethers.utils.parseEther("100")), // hex encoded wei amount
    ];

    const tx = await provider.send("tenderly_addBalance", params);
    const bal = await provider.getBalance(
        "0x0B00724e15F6BF596F42908598EEf7C6a089233E"
    );
    console.log(ethers.utils.formatEther(bal));
};
getEth();
