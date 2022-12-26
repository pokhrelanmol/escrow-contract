import React, { useEffect } from "react";
import { useWallet } from "../contexts/useWallet";
import { truncateAddress } from "../helper";
import { getSignerAddress } from "../provider";
import Button from "./Button";

const Header = () => {
    const { walletAddress, setWalletAddress } = useWallet();

    const connectWallet = async () => {
        const ethereum = (window as any).ethereum;
        if (ethereum) {
            await ethereum.request({ method: "eth_requestAccounts" });
            try {
                const address: string = (await getSignerAddress()) as string;
                if (address) {
                    setWalletAddress(address);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    useEffect(() => {
        const ethereum = (window as any).ethereum;
        ethereum.on("accountsChanged", () => {
            window.location.reload();
        });
    }, []);
    return (
        <div className="flex justify-around items-center">
            <div>Escrow Frontend</div>
            <div>
                {walletAddress ? (
                    <Button disabled={true}>
                        {truncateAddress(walletAddress)}
                    </Button>
                ) : (
                    <Button handleClick={connectWallet}>Connect</Button>
                )}
            </div>
        </div>
    );
};
export default Header;
