import { Provider } from "@ethersproject/providers";
import { useContext, createContext, useState, useEffect } from "react";
import { getProvider } from "../provider";
import { Children, WalletProps } from "../types";

const WalletContext = createContext<WalletProps>({} as WalletProps);

export const WalletProvider = ({ children }: Children) => {
    const [walletAddress, setWalletAddress] = useState("");
    const [provider, setProvider] = useState<Provider>();
    const ethereum = (window as any).ethereum;
    useEffect(() => {
        (async () => {
            const accounts = await ethereum.request({
                method: "eth_accounts",
            });
            setWalletAddress(accounts[0]);
            const _provider = await getProvider();

            setProvider(_provider);
        })();
    }, []);
    if (provider) {
        provider.on("accountChanged", (address: string) => {
            console.log(address);
        });
    }
    return (
        <WalletContext.Provider
            value={{
                walletAddress,
                setWalletAddress,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};
export const useWallet = () => useContext(WalletContext);
