import React, { ReactNode } from "react";
interface Transaction {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const LoadingContext = React.createContext<Transaction>({
    loading: false,
    setLoading: () => {},
});
type ProviderProps = {
    children: ReactNode;
};

export const LoadingProvider = ({ children }: ProviderProps) => {
    const [loading, setLoading] = React.useState(false);
    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => React.useContext(LoadingContext);
