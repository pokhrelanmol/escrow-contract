import { Contract } from "ethers";
import { EscrowAction } from "./contexts/escrowContext/actions";

export type Children = {
    children: React.ReactNode;
};

export type WalletProps = {
    walletAddress: string;
    setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
};
export interface EscrowContract {
    address: string;
    arbiter: string;
    beneficiary: string;
    depositor: string;
    amount: number;
    isApproved: boolean;
    haveIssue: boolean;
    isIssueRaised: boolean;
    issueReason: string;
}
export type EscrowState = EscrowContract[];

export interface EscrowContractProps {
    state: EscrowContract[];
    handleDeployContract: (
        arbiter: string,
        beneficiary: string,
        amount: number
    ) => Promise<void>;
    handleRaiseIssue: (address: string, reason: string) => Promise<void>;
    handleResolveIssue: (address: string) => Promise<void>;
    handleApprove: (address: string) => Promise<void>;
    handleWithdraw: (address: string) => Promise<void>;
}
export interface ContractCardProps extends EscrowContract {
    handleClick: () => void;
}
export interface EscrowFactoryState {
    deployedEscrows: EscrowContract[];
    createEscrow?: (
        arbiter: string,
        beneficiary: string,
        amount: number
    ) => Promise<void>;
    loading: boolean;
}
