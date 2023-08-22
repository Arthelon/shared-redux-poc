export { DisputeStatusEnum } from "./disputeSlice";
export type { Dispute, DisputeReducerState } from "./disputeSlice";

export { configureDisputeSlice } from "./disputeSlice";
export { configureDisputeApi } from "./api";

// export function configureDisputeSlice(
//     opts: DisputeReducerConfig = {
//         apiBaseUrl: DEFAULT_API_URL,
//         initialState: {
//             disputes: [],
//         },
//         actionOverrides: {},
//         extraActions: () => {},
//     }
// ) {
//     const disputeSlice = configureDisputeSlice({
//         initialState: opts.initialState,
//         actionOverrides: opts.actionOverrides,
//         extraActions: opts.extraActions,
//     });
//     const api = configureApi({
//         apiBaseUrl: opts.apiBaseUrl,
//     });
//     const middleware = api.middleware;
//     const { useGetDisputesQuery, useLazyGetDisputesQuery } = api;

//     // Root Reducer
//     const reducer = combineReducers({
//         dispute: disputeSlice.reducer,
//         api: api.reducer,
//     });

//     return {
//         reducer,
//         api,
//         disputeSlice,
//         middleware,

//         ...disputeSlice.actions,
//     };
// }
