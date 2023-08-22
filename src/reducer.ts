import { combineReducers } from "@reduxjs/toolkit";
import { DisputeSliceConfig, configureDisputeSlice } from "./disputeSlice";
import { ApiConfig, DEFAULT_API_URL, configureApi } from "./api";
export { DisputeStatusEnum, configureDisputeSlice } from "./disputeSlice";
export type { Dispute, DisputeReducerState } from "./disputeSlice";

type DisputeReducerConfig = ApiConfig & DisputeSliceConfig;

export function configureSlice(
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
    const middleware = api.middleware;
    const { useGetDisputesQuery, useLazyGetDisputesQuery } = api;

    // Root Reducer
    const reducer = combineReducers({
        dispute: disputeSlice.reducer,
        api: api.reducer,
    });

    return {
        reducer,
        api,
        disputeSlice,
        middleware,

        // Actions and query hooks
        useGetDisputesQuery,
        useLazyGetDisputesQuery,
        ...disputeSlice.actions,
    };
}

export default configureSlice();
