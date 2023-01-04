import React, { useState } from "react";
import { useContracts } from "../../contexts/escrowContext/ContractContext";
import Button from "../Button";
interface RaiseIssueModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    contractAddress: string;
}
const RaiseIssueModal = ({
    showModal,
    setShowModal,
    contractAddress,
}: RaiseIssueModalProps) => {
    const [reason, setReason] = useState("");
    const { handleRaiseIssue } = useContracts();

    if (!showModal) return null;

    return (
        <div className="flex flex-col  justify-center items-center mx-auto bg-gray-800 bg-opacity-90  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="h-fit w-1/2 flex flex-col items-center gap-4">
                <h1 className="text text-white text-2xl">Reason for Issue</h1>
                <input
                    type="text"
                    className="bg-gray-200 p-2 rounded-md"
                    placeholder="Reason"
                    onChange={(e) => setReason(e.target.value)}
                />
                <div className="space-x-2">
                    <Button
                        handleClick={() => setShowModal(false)}
                        children="Cancel"
                    />
                    <Button
                        children="Raise Issue"
                        handleClick={() => {
                            setShowModal(false);
                            handleRaiseIssue(contractAddress, reason);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default RaiseIssueModal;
