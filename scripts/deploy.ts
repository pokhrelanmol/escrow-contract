import { ethers } from "hardhat";

async function main() {
    const factory = await ethers.getContractFactory("EscrowFactory");
    const contract = await factory.deploy();
    await contract.deployed();
    console.log("EscrowFactory deployed to:", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
