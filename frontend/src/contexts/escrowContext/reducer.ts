import { EscrowState } from "../../types";
import { EscrowAction, actionTypes } from "./actions";
import { stringify } from "flatted";
export const escrowReducer = (
    state: EscrowState,
    action: EscrowAction
): EscrowState => {
    switch (action.type) {
        case actionTypes.SET_INITIAL_STATE:
            return action.payload;

        case actionTypes.DEPLOY_CONTRACT:
            let _state =
                state.length > 0
                    ? [...state, action.payload]
                    : [action.payload];
            return _state;

        case actionTypes.RAISE_ISSUE:
            const stateAfterRaiseIssue = state.map((contract) => {
                if (contract.address === action.payload) {
                    return { ...contract, haveIssue: true };
                }
                return contract;
            });
            localStorage.setItem("escrows", stringify(stateAfterRaiseIssue));
            return stateAfterRaiseIssue;
        case actionTypes.RESOLVE_ISSUE:
            const stateAfterResolve = state.map((contract) => {
                if (contract.address === action.payload) {
                    return {
                        ...contract,
                        haveIssue: false,
                    };
                }
                return contract;
            });
            localStorage.setItem("escrows", stringify(stateAfterResolve));
            return stateAfterResolve;
        case actionTypes.APPROVE:
            const stateAfterApprove = state.map((contract) => {
                if (contract.address === action.payload) {
                    return {
                        ...contract,
                        isApproved: true,
                    };
                }
                return contract;
            });
            localStorage.setItem("escrows", stringify(stateAfterApprove));
            return stateAfterApprove;

        case actionTypes.WITHDRAW:
            const stateAfterWithdrawl = state.filter(
                (contract) => contract.address !== action.payload
            );
            localStorage.setItem("escrows", stringify(stateAfterWithdrawl));
            return stateAfterWithdrawl;

        default:
            return state;
    }
};
