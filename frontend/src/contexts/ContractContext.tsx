import { createContext, useContext, useState } from "react";
import { Children, EscrowContract, EscrowContractProps } from "../types";

const ContractContext = createContext<EscrowContractProps>(
    [] as unknown as EscrowContractProps
);

export const ContractProvider = ({ children }: Children) => {
    const [contracts, setContracts] = useState<EscrowContract[]>(
        [] as EscrowContract[]
    );
    return (
        <ContractContext.Provider value={{ contracts, setContracts }}>
            {children}
        </ContractContext.Provider>
    );
};
export const useContracts = () => useContext(ContractContext);
