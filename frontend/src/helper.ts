import { Contract, ethers } from "ethers";
import { getProvider } from "./provider";

import EscrowArtifacts from "./artifacts/contracts/Escrow.sol/Escrow.json";
import EscrowfactoryArtifacts from "./artifacts/contracts/EscrowFactory.sol/EscrowFactory.json";
import { EscrowFactory } from "./typechain-types/EscrowFactory";

export const truncateAddress = (address: string) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
};
export const getContract = async (address: string) => {
    const provider = getProvider();
    const signer = (await provider).getSigner();
    const contract = new ethers.Contract(address, EscrowArtifacts.abi, signer);

    return contract;
};
export const getEscrowFactoryContract = async (): Promise<EscrowFactory> => {
    const addresses = {
        localhost: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    };
    const provider = getProvider();
    const signer = (await provider).getSigner();
    const address = addresses.localhost;
    const contract: EscrowFactory = new ethers.Contract(
        address,
        EscrowfactoryArtifacts.abi,
        signer
    ) as EscrowFactory;
    return contract;
};
