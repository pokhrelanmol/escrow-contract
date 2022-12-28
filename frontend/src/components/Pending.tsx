import React from "react";
import { usePending } from "../contexts/usePending";

const Pending = () => {
    const { pending, setPending } = usePending();
    return (
        <>
            {pending ? (
                <div className="py-2 px-5 max-w-fit text-center bg-orange-400 text-white mt-2 relative rounded ">
                    Pending...
                </div>
            ) : null}
        </>
    );
};

export default Pending;
