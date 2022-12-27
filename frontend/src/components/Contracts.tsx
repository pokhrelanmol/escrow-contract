import React from "react";
import { useContracts } from "../contexts/ContractContext";
import Button from "./Button";
import ContractCard from "./cards/ContractCard";

const Contracts = () => {
    const { contracts } = useContracts();
    return (
        <div className="my-10">
            <h1 className="text-2xl text-center underline">Recent Escrows</h1>
            <div className="flex gap-3 flex-shrink mt-4 justify-center">
                {contracts?.map(
                    ({ address, amount, beneficiary, depositor, arbiter }) => (
                        <ContractCard
                            address={address}
                            amount={amount}
                            beneficiary={beneficiary}
                            depositor={depositor}
                            arbiter={arbiter}
                            handleClick={() => {}}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Contracts;
