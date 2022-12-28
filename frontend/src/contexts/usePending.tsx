import React, { ReactNode } from "react";
interface Transaction {
    pending: boolean;
    setPending: React.Dispatch<React.SetStateAction<boolean>>;
}
const PendingContext = React.createContext<Transaction>({
    pending: false,
    setPending: () => {},
});
type ProviderProps = {
    children: ReactNode;
};

export const PendingProvider = ({ children }: ProviderProps) => {
    const [pending, setPending] = React.useState(false);
    return (
        <PendingContext.Provider value={{ pending, setPending }}>
            {children}
        </PendingContext.Provider>
    );
};

export const usePending = () => React.useContext(PendingContext);
