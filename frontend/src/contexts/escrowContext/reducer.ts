import { EscrowContract, EscrowState } from "../../types";
import { EscrowAction, actionTypes } from "./actions";
import { parse, stringify } from "flatted";
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
            const newState = state.map((contract) => {
                if (contract.address === action.payload) {
                    return { ...contract, isIssueRaised: true };
                }
                return contract;
            });
            localStorage.setItem("escrows", stringify(newState));
            return newState;
        case actionTypes.RESOLVE_ISSUE_AND_APPROVE:
            const _newState = state.map((contract) => {
                if (contract.address === action.payload) {
                    return {
                        ...contract,
                        isIssueRaised: false,
                        isApproved: true,
                    };
                }
                return contract;
            });
            localStorage.setItem("escrows", stringify(_newState));
            return _newState;
        case actionTypes.WITHDRAW:
            return state.filter(
                (contract) => contract.address !== action.payload
            );

        default:
            return state;
    }
};
