import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContractProvider } from "./contexts/ContractContext";
import { WalletProvider } from "./contexts/useWallet";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <WalletProvider>
            <ContractProvider>
                <App />
            </ContractProvider>
        </WalletProvider>
    </React.StrictMode>
);
