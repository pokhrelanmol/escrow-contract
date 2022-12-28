import { Contract } from "ethers";

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
    isIssueRaised: boolean;
    contractInstance?: Contract;
}
export type EscrowState = EscrowContract[];

export interface EscrowContractProps {
    state: EscrowContract[];
    handleDeployContract: (
        arbiter: string,
        beneficiary: string,
        amount: number
    ) => Promise<void>;
    handleRaiseIssue: (address: string) => Promise<void>;
    handleResolveIssueAndApprove: (address: string) => Promise<void>;
    handleWithdraw: (address: string) => Promise<void>;
}
export interface ContractCardProps extends EscrowContract {
    handleClick: () => void;
}
