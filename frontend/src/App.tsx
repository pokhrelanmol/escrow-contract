import { useEffect, useState } from "react";
import { ethers, providers } from "ethers";
import Header from "./components/Header";
import EscrowForm from "./components/EscrowForm";
import Contracts from "./components/Contracts";
import { ToastContainer } from "react-toastify";
function App() {
    return (
        <div className="max-w-7xl mx-auto">
            <Header />
            <EscrowForm />
            <Contracts />
            <ToastContainer />
        </div>
    );
}

export default App;
