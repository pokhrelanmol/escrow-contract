import { ethers } from "ethers";
import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import { Children, EscrowContractProps } from "../../types";
import { initialState } from "./state";
import { escrowReducer } from "./reducer";
import { actionTypes, deployContract, raiseIssue, withdraw } from "./actions";
import { useLoading } from "../useLoading";
import { parse, stringify } from "flatted";

const ContractContext = createContext<EscrowContractProps>(
    {} as EscrowContractProps
);

export const ContractProvider = ({ children }: Children) => {
    const [state, dispatch] = useReducer(escrowReducer, initialState);
    const { loading, setLoading } = useLoading();
    useEffect(() => {
        (async () => {
            const contracts = localStorage.getItem("escrows");
            dispatch({
                type: actionTypes.SET_INITIAL_STATE,
                payload: contracts?.length ? parse(contracts) : [],
            });
        })();
    }, []);

    const handleDeployContract = async (
        arbiter: string,
        beneficiary: string,
        amount: number
    ) => {
        const payload = await deployContract(arbiter, beneficiary, amount);
        dispatch({
            type: actionTypes.DEPLOY_CONTRACT,
            payload,
        });
        localStorage.setItem("escrows", stringify([...state, payload]));
    };
    const handleRaiseIssue = async (contractAddress: string) => {
        await raiseIssue(contractAddress);
        dispatch({
            type: actionTypes.RAISE_ISSUE,
            payload: contractAddress,
        });
    };
    const handleResolveIssueAndApprove = async (contractAddress: string) => {
        await raiseIssue(contractAddress);
        dispatch({
            type: actionTypes.RESOLVE_ISSUE_AND_APPROVE,
            payload: contractAddress,
        });
    };

    const handleWithdraw = async (contractAddress: string) => {
        await withdraw(contractAddress);
        dispatch({
            type: actionTypes.WITHDRAW,
            payload: contractAddress,
        });
    };

    return (
        <ContractContext.Provider
            value={{
                state,
                handleDeployContract,
                handleResolveIssueAndApprove,
                handleRaiseIssue,
                handleWithdraw,
            }}
        >
            {children}
        </ContractContext.Provider>
    );
};
export const useContracts = () => useContext(ContractContext);
