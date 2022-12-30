import React from "react";
import { useContracts } from "../../contexts/escrowContext/ContractContext";
import { ContractCardProps, EscrowContract } from "../../types";
import ButtonsToRender from "../ButtonsToRender";

const ContractCard = ({
    address,
    beneficiary,
    amount,
    depositor,
    arbiter,
    isApproved,
    haveIssue,
    isIssueRaised,
    handleClick,
}: ContractCardProps) => {
    console.log("havIssue", haveIssue);
    return (
        <div className="flex flex-col gap-1 rounded-lg bg-gray-200 p-7">
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
                <span className="text-gray-600 pl-3 text-base">
                    {" "}
                    {amount} ETH
                </span>
            </div>
            {haveIssue ? (
                <div className="text-orange-400 text-lg">
                    Status :{" "}
                    <span className="text-gray-600 pl-3 text-base">
                        {" "}
                        ⚔️ Issue is Raised
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
            ) : !haveIssue && !isApproved ? (
                <div className="text-orange-400 text-lg">
                    Status :{" "}
                    <span className="text-gray-600 pl-3 text-base">
                        {" "}
                        🚥 Ongoing Deal
                    </span>
                </div>
            ) : null}
            <ButtonsToRender
                address={address}
                beneficiary={beneficiary}
                amount={amount}
                depositor={depositor}
                arbiter={arbiter}
                isApproved={isApproved}
                haveIssue={haveIssue}
                isIssueRaised={isIssueRaised}
                handleClick={handleClick}
            />
        </div>
    );
};

export default ContractCard;
