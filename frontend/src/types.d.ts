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
}
export interface EscrowContractProps {
    contracts: EscrowContract[];
    setContracts: React.Dispatch<React.SetStateAction<EscrowContract[]>>;
}
export interface ContractCardProps extends EscrowContract {
    handleClick: () => void;
}
