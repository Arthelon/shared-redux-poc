import { combineReducers } from "@reduxjs/toolkit";
import { DisputeSliceConfig, configureDisputeSlice } from "./disputeSlice";
import { ApiConfig, configureApi } from "./api";
export type {
    Dispute,
    DisputeStatusEnum,
    DisputeReducerState,
} from "./disputeSlice";

type DisputeReducerConfig = ApiConfig & DisputeSliceConfig;

export function configureReducer(
    opts: DisputeReducerConfig = {
        apiBaseUrl: "https://64e4d4fbc55563802913d3d7.mockapi.io/api/",
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
