import { useContracts } from "../contexts/escrowContext/ContractContext";
import ContractCard from "./cards/ContractCard";

const Contracts = () => {
    const { state } = useContracts();
    console.log(state);
    return (
        <div className="my-10">
            <h1 className="text-2xl text-center underline">Recent Contracts</h1>
            <div className="grid grid-cols-2 gap-5 mx-5 items-center mt-6 ">
                {state.length
                    ? state.map(
                          ({
                              address,
                              amount,
                              beneficiary,
                              depositor,
                              arbiter,
                              isApproved,
                              haveIssue,
                              isIssueRaised,
                          }) => (
                              <ContractCard
                                  isIssueRaised={isIssueRaised}
                                  key={address}
                                  address={address}
                                  amount={amount}
                                  beneficiary={beneficiary}
                                  depositor={depositor}
                                  arbiter={arbiter}
                                  isApproved={isApproved}
                                  haveIssue={haveIssue}
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
