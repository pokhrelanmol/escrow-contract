import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Children, EscrowContractProps } from "../../types";
import { initialState } from "./state";
import { escrowReducer } from "./reducer";
import {
    actionTypes,
    approve,
    deployContract,
    raiseIssue,
    resolveIssue,
    withdraw,
} from "./actions";
import { usePending } from "../usePending";
import { parse, stringify } from "flatted";
import { toast } from "react-toastify";
import { useEscrowFactory } from "../EscrowFactoryContext";

const ContractContext = createContext<EscrowContractProps>(
    {} as EscrowContractProps
);

export const ContractProvider = ({ children }: Children) => {
    const [state, dispatch] = useReducer(escrowReducer, initialState);
    const { pending, setPending } = usePending();
    const { deployedEscrows } = useEscrowFactory();
    useEffect(() => {
        (async () => {
            // if (deployedEscrows.length === 0) return;
            try {
                dispatch({
                    type: actionTypes.SET_INITIAL_STATE,
                    payload: deployedEscrows,
                });
            } catch (error) {
                console.log(error);
            }
        })();
    }, [JSON.stringify(deployedEscrows)]);
    const handleDeployContract = async (
        arbiter: string,
        beneficiary: string,
        amount: number
    ) => {
        setPending(true);
        const payload = await deployContract(arbiter, beneficiary, amount);
        setPending(false);
        dispatch({
            type: actionTypes.DEPLOY_CONTRACT,
            payload,
        });
        // setPending(false);

        toast.success("Escrow deployed successfully");
    };
    const handleRaiseIssue = async (
        contractAddress: string,
        reason: string
    ) => {
        setPending(true);
        const contract = await raiseIssue(contractAddress, reason);
        contract.on("IssueRaised", () => {
            const payload = {
                contractAddress: contractAddress,
                reason: reason,
            };
            dispatch({
                type: actionTypes.RAISE_ISSUE,
                payload: payload,
            });
            setPending(false);

            toast.success("Issue Raised successfully");
        });
    };
    const handleResolveIssue = async (contractAddress: string) => {
        setPending(true);
        const contract = await resolveIssue(contractAddress);
        contract.on("IssueResolved", () => {
            dispatch({
                type: actionTypes.RESOLVE_ISSUE,
                payload: contractAddress,
            });
            setPending(false);

            toast.success("Issue Resolved successfully");
        });
    };
    const handleApprove = async (contractAddress: string) => {
        setPending(true);
        const contract = await approve(contractAddress);
        contract.on("Approved", () => {
            dispatch({
                type: actionTypes.APPROVE,
                payload: contractAddress,
            });
            setPending(false);
            toast.success(" 🎊 Approved successfully");
        });
    };

    const handleWithdraw = async (contractAddress: string) => {
        setPending(true);
        const contract = await withdraw(contractAddress);
        contract.on("Withdrawn", () => {
            dispatch({
                type: actionTypes.WITHDRAW,
                payload: contractAddress,
            });
            setPending(false);

            toast.success("Withdrawl successfully");
        });
    };

    return (
        <ContractContext.Provider
            value={{
                state,
                handleDeployContract,
                handleResolveIssue,
                handleApprove,
                handleRaiseIssue,
                handleWithdraw,
            }}
        >
            {children}
        </ContractContext.Provider>
    );
};
export const useContracts = () => useContext(ContractContext);
