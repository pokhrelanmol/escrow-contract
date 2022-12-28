import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContractProvider } from "./contexts/escrowContext/ContractContext";
import { LoadingProvider } from "./contexts/useLoading";
import { WalletProvider } from "./contexts/useWallet";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <WalletProvider>
            <ContractProvider>
                <LoadingProvider>
                    <App />
                </LoadingProvider>
            </ContractProvider>
        </WalletProvider>
    </React.StrictMode>
);
