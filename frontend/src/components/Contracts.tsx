import React from "react";
import { useContracts } from "../contexts/escrowContext/ContractContext";
import Button from "./Button";
import ContractCard from "./cards/ContractCard";

const Contracts = () => {
    const { state } = useContracts();

    return (
        <div className="my-10">
            <h1 className="text-2xl text-center underline">Recent Escrows</h1>
            <div className="flex gap-3 flex-shrink mt-4 justify-center">
                {state.length
                    ? state.map(
                          ({
                              address,
                              amount,
                              beneficiary,
                              depositor,
                              arbiter,
                              isApproved,
                              isIssueRaised,
                              contractInstance,
                          }) => (
                              <ContractCard
                                  key={address}
                                  address={address}
                                  amount={amount}
                                  beneficiary={beneficiary}
                                  depositor={depositor}
                                  arbiter={arbiter}
                                  contractInstance={contractInstance}
                                  isApproved={isApproved}
                                  isIssueRaised={isIssueRaised}
                                  handleClick={() => {}}
                              />
                          )
                      )
                    : null}
            </div>
        </div>
    );
};

export default Contracts;
