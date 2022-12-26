import React from "react";
import { ContractCardProps, EscrowContract } from "../../types";
import Button from "../Button";

const ContractCard = ({
    address,
    beneficiary,
    amount,
    depositor,
    arbiter,
    handleClick,
}: ContractCardProps) => {
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
            <div className="text-center">
                <Button handleClick={handleClick}>Approve</Button>
            </div>
        </div>
    );
};

export default ContractCard;
