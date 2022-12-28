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
import {
    actionTypes,
    deployContract,
    raiseIssue,
    resolveIssue,
    withdraw,
} from "./actions";
import { usePending } from "../usePending";
import { parse, stringify } from "flatted";
import { toast } from "react-toastify";

const ContractContext = createContext<EscrowContractProps>(
    {} as EscrowContractProps
);

export const ContractProvider = ({ children }: Children) => {
    const [state, dispatch] = useReducer(escrowReducer, initialState);
    const { pending, setPending } = usePending();
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
        setPending(true);
        const payload = await deployContract(arbiter, beneficiary, amount);
        dispatch({
            type: actionTypes.DEPLOY_CONTRACT,
            payload,
        });
        setPending(false);

        toast.success("Escrow deployed successfully");
        localStorage.setItem("escrows", stringify([...state, payload]));
    };
    const handleRaiseIssue = async (contractAddress: string) => {
        setPending(true);
        const contract = await raiseIssue(contractAddress);
        contract.on("IssueRaised", () => {
            dispatch({
                type: actionTypes.RAISE_ISSUE,
                payload: contractAddress,
            });
            setPending(false);

            toast.success("Issue Raised successfully");
        });
    };
    const handleResolveIssueAndApprove = async (contractAddress: string) => {
        setPending(true);
        const contract = await resolveIssue(contractAddress);
        contract.on("IssueResolved", () => {
            dispatch({
                type: actionTypes.RESOLVE_ISSUE_AND_APPROVE,
                payload: contractAddress,
            });
            setPending(false);

            toast.success("Approved and Issue Resolved successfully");
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
