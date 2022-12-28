import React from "react";
import { usePending } from "../contexts/usePending";
type ButtonProps = {
    children: React.ReactNode;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
};
const Button = ({ children, handleClick, disabled }: ButtonProps) => {
    const { pending } = usePending();
    return (
        <button
            onClick={handleClick}
            className="py-2 px-5 bg-indigo-600 text-white rounded-md "
            disabled={pending ? true : disabled}
        >
            {children}
        </button>
    );
};

export default Button;
