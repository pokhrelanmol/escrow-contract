import { ethers } from "ethers";
import { getProvider } from "./provider";

import EscrowArtifacts from "./artifacts/contracts/Escrow.sol/Escrow.json";

export const truncateAddress = (address: string) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
};
export const getContract = async (address: string) => {
    const provider = getProvider();
    const signer = (await provider).getSigner();
    const contract = new ethers.Contract(address, EscrowArtifacts.abi, signer);
    return contract;
};
