import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContractProvider } from "./contexts/escrowContext/ContractContext";
import { EscrowFactoryProvider } from "./contexts/EscrowFactoryContext";
import { PendingProvider } from "./contexts/usePending";
import { WalletProvider } from "./contexts/useWallet";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <PendingProvider>
        <WalletProvider>
            <EscrowFactoryProvider>
                <ContractProvider>
                    <App />
                </ContractProvider>
            </EscrowFactoryProvider>
        </WalletProvider>
    </PendingProvider>
);
