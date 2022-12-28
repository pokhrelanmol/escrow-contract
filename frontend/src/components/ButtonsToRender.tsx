import React from "react";
import { useContracts } from "../contexts/escrowContext/ContractContext";
import { useWallet } from "../contexts/useWallet";
import { ContractCardProps } from "../types";
import Button from "./Button";

const ButtonsToRender = ({
    address,
    beneficiary,
    amount,
    depositor,
    arbiter,
    isApproved,
    haveIssue,
    handleClick,
}: ContractCardProps) => {
    const { walletAddress } = useWallet();
    const resolvedBtn =
        (walletAddress?.toLowerCase() === depositor.toLowerCase() &&
            isApproved) ||
        (walletAddress?.toLowerCase() === arbiter.toLowerCase() && isApproved);
    const approveBtn =
        (walletAddress?.toLowerCase() === depositor.toLowerCase() &&
            !haveIssue) ||
        (walletAddress?.toLowerCase() === arbiter.toLowerCase() && !haveIssue);
    console.log(approveBtn);
    const resolveIssueBtn =
        (walletAddress?.toLowerCase() === depositor.toLowerCase() &&
            haveIssue) ||
        (walletAddress?.toLowerCase() === arbiter.toLowerCase() && haveIssue);
    const withdrawBtn =
        walletAddress?.toLowerCase() === beneficiary.toLowerCase() &&
        isApproved;
    const {
        handleRaiseIssue,
        handleResolveIssue,
        handleWithdraw,
        handleApprove,
    } = useContracts();
    return (
        <div>
            {!walletAddress ? (
                <div className="text-center text-red-700 text-2xl">
                    Pease connect Your Wallet First
                </div>
            ) : resolvedBtn ? (
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
                        <Button handleClick={() => handleResolveIssue(address)}>
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
                            <Button handleClick={() => handleApprove(address)}>
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

export default ButtonsToRender;
