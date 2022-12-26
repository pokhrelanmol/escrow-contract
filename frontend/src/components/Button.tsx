import React from "react";
type ButtonProps = {
    children: React.ReactNode;
    handleClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
};
const Button = ({ children, handleClick, disabled }: ButtonProps) => {
    return (
        <button
            onClick={handleClick}
            className="py-2 px-5 bg-indigo-600 text-white rounded-md "
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
