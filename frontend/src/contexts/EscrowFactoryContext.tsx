import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getEscrowFactoryContract, getContract } from "../helper";
import { Escrow } from "../typechain-types";
import { EscrowFactory } from "../typechain-types/EscrowFactory";
import { Children, EscrowContract, EscrowFactoryState } from "../types";
import { usePending } from "./usePending";

const initialState: EscrowFactoryState = {} as EscrowFactoryState;

export const EscrowFactoryContext =
    createContext<EscrowFactoryState>(initialState);

export const EscrowFactoryProvider = ({ children }: Children) => {
    const [contract, setContract] = useState<EscrowFactory>();
    const [loading, setLoading] = useState<boolean>(false);
    const [deployedEscrows, setDeployedEscrows] = useState<EscrowContract[]>(
        []
    );
    const { setPending } = usePending();

    /*********************************
     *  FETCH ALL DEPLOYED ESCROWS *
     *********************************/
    const fetchContracts = async () => {
        try {
            setLoading(true);
            const escrowFactory = await getEscrowFactoryContract();
            setContract(escrowFactory);
            const escrows =
                (await escrowFactory.getEscrows()) as unknown as string[];

            const escrowContracts: EscrowContract[] = [];
            for (let address of escrows) {
                const escrowContract = (await getContract(address)) as Escrow;

                const payload: EscrowContract = {
                    address,
                    arbiter: await escrowContract.arbiter(),
                    beneficiary: await escrowContract.beneficiary(),
                    depositor: await escrowContract.depositor(),
                    isApproved: await escrowContract.isApproved(),
                    isIssueRaised: await escrowContract.isIssueRaised(),
                    haveIssue: await escrowContract.haveIssue(),
                    issueReason: await escrowContract.issueReason(),
                    amount: Number(
                        ethers.utils.formatEther(
                            await escrowContract.getBalance()
                        )
                    ),
                };

                escrowContracts.push(payload);
            }
            setDeployedEscrows(escrowContracts);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        fetchContracts();
    }, []);

    /**
     *
     * @param arbiter
     * @param beneficiary
     * @param amount
     * @returns Promise<void>
     */

    const createEscrow = async (
        arbiter: string,
        beneficiary: string,
        amount: number
    ): Promise<void> => {
        setPending(true);
        if (!contract) return;
        try {
            const tx = await contract.createEscrow(arbiter, beneficiary, {
                value: ethers.utils.parseEther(amount.toString()),
            });
            await tx.wait(1);
            contract.on("EscrowCreated", async (escrow: string) => {
                const contract = await getContract(escrow);
                const newEscrow = {
                    address: escrow,
                    arbiter: await contract.arbiter(),
                    beneficiary: await contract.beneficiary(),
                    depositor: await contract.depositor(),
                    isApproved: await contract.isApproved(),
                    isIssueRaised: await contract.isIssueRaised(),
                    haveIssue: await contract.haveIssue(),
                    issueReason: await contract.issueReason(),
                    amount: Number(
                        ethers.utils.formatEther(await contract.getBalance())
                    ),
                };

                setPending(false);
                setDeployedEscrows([...deployedEscrows, newEscrow]);
                toast.success("Escrow deployed successfully");
            });
        } catch (error) {
            setPending(false);
            toast.error("Something went wrong");
        }
    };
    return (
        <EscrowFactoryContext.Provider
            value={{
                deployedEscrows,
                createEscrow,
                loading,
            }}
        >
            {children}
        </EscrowFactoryContext.Provider>
    );
};
export const useEscrowFactory = () => useContext(EscrowFactoryContext);
