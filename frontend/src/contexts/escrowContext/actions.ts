import { ethers } from "ethers";
import { getProvider } from "../../provider";
import { EscrowContract } from "../../types";
import { Escrow } from "../../typechain-types/Escrow";
import EscrowArtifacts from "../../artifacts/contracts/Escrow.sol/Escrow.json";
import { getContract } from "../../helper";

export enum actionTypes {
    DEPLOY_CONTRACT,
    SET_INITIAL_STATE,
    RAISE_ISSUE,
    RESOLVE_ISSUE,
    APPROVE,
    WITHDRAW,
}
export type SetInitialState = {
    type: actionTypes.SET_INITIAL_STATE;
    payload: EscrowContract[];
};
export type DeployContract = {
    type: actionTypes.DEPLOY_CONTRACT;
    payload: EscrowContract;
};
export type RaiseIssue = {
    type: actionTypes.RAISE_ISSUE;
    payload: string;
};
export type ResolveIssue = {
    type: actionTypes.RESOLVE_ISSUE;
    payload: string;
};
export type Approve = {
    type: actionTypes.APPROVE;
    payload: string;
};
export type Withdraw = {
    type: actionTypes.WITHDRAW;
    payload: string;
};

export type EscrowAction =
    | SetInitialState
    | DeployContract
    | RaiseIssue
    | ResolveIssue
    | Approve
    | Withdraw;

export const deployContract = async (
    arbiter: string,
    beneficiary: string,
    amount: number
) => {
    const provider = getProvider();
    const signer = (await provider).getSigner();
    const factory = new ethers.ContractFactory(
        EscrowArtifacts.abi,
        EscrowArtifacts.bytecode,
        signer
    );
    const contract = await factory.deploy(arbiter, beneficiary, {
        value: ethers.utils.parseEther(amount.toString()),
    });
    await contract.deployTransaction.wait(1);
    await contract.deployed();
    const payload = {
        address: contract.address,
        depositor: await signer.getAddress(),
        amount,
        arbiter,
        beneficiary,
        isApproved: false,
        isIssueRaised: false,
        haveIssue: false,
    };
    return payload;
};
export const raiseIssue = async (address: string) => {
    const contract = (await getContract(address)) as Escrow;

    const tx = await contract.raiseIssue();
    return contract;
};
export const resolveIssue = async (address: string) => {
    const contract: Escrow = (await getContract(address)) as Escrow;
    const tx = await contract.resolveIssue();

    return contract;
};
export const approve = async (address: string) => {
    const contract: Escrow = (await getContract(address)) as Escrow;
    const tx = await contract.approve();
    return contract;
};
export const withdraw = async (address: string) => {
    const contract = (await getContract(address)) as Escrow;
    const tx = await contract.withdraw();

    return contract;
};
// TODO: resolveIssue
// TODO: withdraw
