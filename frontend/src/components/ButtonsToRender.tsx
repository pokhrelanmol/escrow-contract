import { useState } from "react";
import { useContracts } from "../contexts/escrowContext/ContractContext";
import { useWallet } from "../contexts/useWallet";
import { ContractCardProps } from "../types";
import Button from "./Button";
import RaiseIssueModal from "./modals/RaiseIssueModal";

const ButtonsToRender = ({
    address,
    beneficiary,
    depositor,
    arbiter,
    isApproved,
    haveIssue,
    isIssueRaised,
    handleClick,
}: ContractCardProps) => {
    const { walletAddress } = useWallet();
    const [showModal, setShowModal] = useState(false);

    const resolvedBtn =
        (walletAddress?.toLowerCase() === depositor.toLowerCase() &&
            isApproved) ||
        (walletAddress?.toLowerCase() === arbiter.toLowerCase() && isApproved);
    const raiseIssueBtn =
        walletAddress?.toLowerCase() === depositor.toLowerCase();
    const resolveIssueBtn =
        (walletAddress?.toLowerCase() === depositor.toLowerCase() &&
            haveIssue) ||
        (walletAddress?.toLowerCase() === arbiter.toLowerCase() && haveIssue);
    const approveBtnForDepositor =
        walletAddress?.toLowerCase() === depositor.toLowerCase() &&
        !haveIssue &&
        raiseIssueBtn;
    const approveBtnForArbiter =
        walletAddress?.toLowerCase() === arbiter.toLowerCase() &&
        isIssueRaised &&
        walletAddress?.toLowerCase() === arbiter.toLowerCase() &&
        !haveIssue;
    const withdrawBtn =
        walletAddress?.toLowerCase() === beneficiary.toLowerCase() &&
        isApproved;
    const { handleResolveIssue, handleWithdraw, handleApprove } =
        useContracts();
    return (
        <div>
            <RaiseIssueModal
                showModal={showModal}
                setShowModal={setShowModal}
                contractAddress={address}
            />
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
            ) : approveBtnForDepositor ? (
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
                                handleClick={() => {
                                    setShowModal(true);
                                    // handleRaiseIssue(address);
                                }}
                            >
                                Raise Issue
                            </Button>
                        </div>
                    </div>
                </div>
            ) : approveBtnForArbiter ? (
                <div className="flex gap-2 justify-center">
                    <div className="text-center">
                        <Button handleClick={() => handleApprove(address)}>
                            Approve
                        </Button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ButtonsToRender;
