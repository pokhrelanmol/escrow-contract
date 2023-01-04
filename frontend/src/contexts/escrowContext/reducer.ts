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
                console.log(
                    action.payload.reason,
                    action.payload.contractAddress
                );
                if (contract.address === action.payload.contractAddress) {
                    return {
                        ...contract,
                        haveIssue: true,
                        issueReason: action.payload.reason,
                    };
                }
                return contract;
            });
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
            return stateAfterApprove;

        case actionTypes.WITHDRAW:
            const stateAfterWithdrawl = state.filter(
                (contract) => contract.address !== action.payload
            );
            return stateAfterWithdrawl;

        default:
            return state;
    }
};
