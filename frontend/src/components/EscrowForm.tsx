import { ethers } from "ethers";
import React, { useState } from "react";
import Button from "./Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContracts } from "../contexts/escrowContext/ContractContext";
import { usePending } from "../contexts/usePending";
import { useWallet } from "../contexts/useWallet";
import { useEscrowFactory } from "../contexts/EscrowFactoryContext";
interface FormData {
    arbiter: string;
    beneficiary: string;
    amount: number;
}
const EscrowForm = () => {
    const { handleDeployContract } = useContracts();
    const { createEscrow } = useEscrowFactory();
    const [formData, setFormData] = useState({} as FormData);
    const { walletAddress } = useWallet();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleDeploy = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { arbiter, beneficiary, amount } = formData;
        if (!arbiter || !beneficiary || !amount) {
            toast.error("Please fill all fields");
            return;
        } else {
            await createEscrow!(arbiter, beneficiary, amount);
            setFormData({} as FormData);
        }
    };
    return (
        <div className="flex flex-col max-w-3xl mx-auto  bg-gray-300 p-10 rounded-lg">
            <h1 className="text-center text-2xl font-semibold">New Contract</h1>

            <form className="flex flex-col space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="arbiter">Arbiter</label>
                    <input
                        type="text"
                        className="bg-gray-200 p-2 rounded-md"
                        name="arbiter"
                        onChange={handleChange}
                        placeholder="Arbiter Address"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="beneficiary">Beneficiary</label>
                    <input
                        className="bg-gray-200 p-2 rounded-md"
                        type="text"
                        name="beneficiary"
                        placeholder="Beneficiary Address"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="deposit">Amount(ETH)</label>
                    <input
                        className="bg-gray-200 p-2 rounded-md"
                        type="number"
                        name="amount"
                        placeholder="Amount in ETH"
                        onChange={handleChange}
                    />
                </div>
                <div className="text-center">
                    {!walletAddress ? (
                        <div className="text-center text-red-700 text-2xl">
                            Pease connect Your Wallet First
                        </div>
                    ) : (
                        <Button handleClick={handleDeploy}>Deploy</Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EscrowForm;
