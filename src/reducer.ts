import { combineReducers } from "@reduxjs/toolkit";
import { DisputeSliceConfig, configureDisputeSlice } from "./disputeSlice";
import { ApiConfig, DEFAULT_API_URL, configureApi } from "./api";
export { DisputeStatusEnum, configureDisputeSlice } from "./disputeSlice";
export type { Dispute, DisputeReducerState } from "./disputeSlice";

type DisputeReducerConfig = ApiConfig & DisputeSliceConfig;

export function configureReducer(
    opts: DisputeReducerConfig = {
        apiBaseUrl: DEFAULT_API_URL,
        initialState: {
            disputes: [],
        },
        actionOverrides: {},
        extraActions: () => {},
    }
) {
    const disputeSlice = configureDisputeSlice({
        initialState: opts.initialState,
        actionOverrides: opts.actionOverrides,
        extraActions: opts.extraActions,
    });
    const api = configureApi({
        apiBaseUrl: opts.apiBaseUrl,
    });
    const reducer = combineReducers({
        dispute: disputeSlice.reducer,
        api: api.reducer,
    });
    const middleware = api.middleware;
    return {
        reducer,
        api,
        disputeSlice,
        middleware,
    };
}

export default configureReducer();
