import React from "react";
import { useContracts } from "../../contexts/escrowContext/ContractContext";
import { useWallet } from "../../contexts/useWallet";
import { ContractCardProps, EscrowContract } from "../../types";
import Button from "../Button";

const ContractCard = ({
    address,
    beneficiary,
    amount,
    depositor,
    arbiter,
    isApproved,
    isIssueRaised,
    handleClick,
}: ContractCardProps) => {
    const { walletAddress } = useWallet();
    const { handleRaiseIssue, handleResolveIssueAndApprove, handleWithdraw } =
        useContracts();
    const resolvedBtn =
        (walletAddress.toLowerCase() === depositor.toLowerCase() &&
            isApproved) ||
        (walletAddress.toLowerCase() === arbiter.toLowerCase() && isApproved);
    const approveBtn =
        (walletAddress.toLowerCase() === depositor.toLowerCase() &&
            !isIssueRaised) ||
        (walletAddress.toLowerCase() === arbiter.toLowerCase() &&
            !isIssueRaised);
    const resolveIssueBtn =
        (walletAddress.toLowerCase() === depositor.toLowerCase() &&
            isIssueRaised) ||
        (walletAddress.toLowerCase() === arbiter.toLowerCase() &&
            isIssueRaised);
    const withdrawBtn =
        walletAddress.toLowerCase() === beneficiary.toLowerCase() && isApproved;
    return (
        <div className="flex flex-col rounded-lg bg-gray-200 p-8">
            <div className="text-orange-400 text-lg">
                Contract Address :{" "}
                <span className="text-gray-600 pl-3 text-base">
                    {" "}
                    {address}{" "}
                </span>
            </div>
            <div className="text-orange-400 text-lg">
                {" "}
                Depositer :{" "}
                <span className="text-gray-600 pl-3 text-base">
                    {" "}
                    {depositor}{" "}
                </span>
            </div>
            <div className="text-orange-400 text-lg">
                {" "}
                Beneficiary:{" "}
                <span className="text-gray-600 pl-3 text-base">
                    {" "}
                    {beneficiary}{" "}
                </span>
            </div>
            <div className="text-orange-400 text-lg">
                Arbiter :{" "}
                <span className="text-gray-600 pl-3 text-base">
                    {" "}
                    {arbiter}{" "}
                </span>
            </div>
            <div className="text-orange-400 text-lg">
                Amount :{" "}
                <span className="text-gray-600 pl-3 text-base"> {amount} </span>
            </div>
            {isIssueRaised ? (
                <div className="text-orange-400 text-lg">
                    Status :{" "}
                    <span className="text-gray-600 pl-3 text-base">
                        {" "}
                        Issue is Raised
                    </span>
                </div>
            ) : isApproved ? (
                <div className="text-orange-400 text-lg">
                    Status :{" "}
                    <span className="text-gray-600 pl-3 text-base">
                        {" "}
                        ✅ Approved
                    </span>
                </div>
            ) : !isIssueRaised && !isApproved ? (
                <div className="text-orange-400 text-lg">
                    Status :{" "}
                    <span className="text-gray-600 pl-3 text-base">
                        {" "}
                        🚥 Ongoing Deal
                    </span>
                </div>
            ) : null}
            {resolvedBtn ? (
                <div>
                    <div className="text-center">
                        <Button disabled={true} handleClick={handleClick}>
                            ✅ Successfully Approved
                        </Button>
                    </div>
                </div>
            ) : resolveIssueBtn ? (
                <div>
                    <div className="text-center">
                        <Button
                            handleClick={() =>
                                handleResolveIssueAndApprove(address)
                            }
                        >
                            Resolve Issue
                        </Button>
                    </div>
                </div>
            ) : withdrawBtn ? (
                <div>
                    <div className="text-center">
                        <Button handleClick={() => handleWithdraw(address)}>
                            Withdraw
                        </Button>
                    </div>
                </div>
            ) : approveBtn ? (
                <div className="flex gap-2 justify-center">
                    <div>
                        <div className="text-center">
                            <Button
                                handleClick={() =>
                                    handleResolveIssueAndApprove(address)
                                }
                            >
                                Approve
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div className="text-center">
                            <Button
                                handleClick={() => handleRaiseIssue(address)}
                            >
                                Raise Issue
                            </Button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ContractCard;
