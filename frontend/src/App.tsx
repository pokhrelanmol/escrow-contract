import { useState } from "react";
import { ethers, providers } from "ethers";
import Header from "./components/Header";
import EscrowForm from "./components/EscrowForm";
import Contracts from "./components/Contracts";
function App() {
    return (
        <div className="">
            <Header />
            <EscrowForm />
            <Contracts />
        </div>
    );
}

export default App;
