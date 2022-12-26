import { ethers, providers } from "ethers";
type Provider = providers.Web3Provider;
export const getProvider = async () => {
    let provider: Provider;
    if (typeof window !== "undefined" && (window as any).ethereum) {
        provider = new ethers.providers.Web3Provider((window as any).ethereum);
    } else {
        throw new Error("Web 3 provider not found");
    }
    return provider;
};

export const getSigner = async () => {
    try {
        const provider = await getProvider();
        return provider.getSigner();
    } catch (error) {
        console.log(error);
    }
};
export const getSignerAddress = async (): Promise<string | undefined> => {
    try {
        const signer = await getSigner();
        return (await signer?.getAddress()) as string;
    } catch (error) {
        console.log(error);
    }
};
