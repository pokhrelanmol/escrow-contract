import { ethers } from "ethers";
import React, { useState } from "react";
import EscrowArtifacts from "../artifacts/contracts/Escrow.sol/Escrow.json";
import { getProvider } from "../provider";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContracts } from "../contexts/ContractContext";
interface FormData {
    arbiter: string;
    beneficiary: string;
    amount: number;
}
const EscrowForm = () => {
    const { contracts, setContracts } = useContracts();
    const [formData, setFormData] = useState({} as FormData);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleDeploy = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const { arbiter, beneficiary, amount } = formData;
            const provider = await getProvider();
            const signer = provider.getSigner();
            const signerAddress = await signer.getAddress();
            const factory = new ethers.ContractFactory(
                EscrowArtifacts.abi,
                EscrowArtifacts.bytecode,
                signer
            );
            const txRes = await factory.deploy(arbiter, beneficiary, {
                value: ethers.utils.parseEther(amount.toString()),
            });
            await txRes.deployed();
            console.log(contracts);
            setContracts([
                ...contracts,
                {
                    address: txRes.address,
                    arbiter,
                    beneficiary,
                    depositor: signerAddress,
                    amount,
                },
            ]);
            toast.success("Escrow deployed successfully");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex flex-col max-w-3xl mx-auto mt-20 bg-gray-300 p-10 rounded-lg">
            <h1 className="text-center text-2xl font-semibold">New Escrow</h1>

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
                    <Button handleClick={handleDeploy}>Deploy</Button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default EscrowForm;
