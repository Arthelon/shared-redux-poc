import {
    ActionReducerMapBuilder,
    PayloadAction,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
    createSlice,
} from "@reduxjs/toolkit";
import api from "./api";

export type Dispute = {
    createTime: string;
    id: string | number;
    amount: number;
    status: DisputeStatusEnum;
};

export enum DisputeStatusEnum {
    Open = 0,
    Challenged = 1,
    Condeded = 2,
}

export type DisputeReducerState = {
    disputes: Dispute[];
};

const initialState: DisputeReducerState = {
    disputes: [],
};

export type DisputeSliceConfig = {
    actionOverrides: ValidateSliceCaseReducers<
        DisputeReducerState,
        SliceCaseReducers<DisputeReducerState>
    >;
    initialState: DisputeReducerState;
    extraActions: (
        builder: ActionReducerMapBuilder<DisputeReducerState>
    ) => void;
};

export function configureDisputeSlice(
    opts: DisputeSliceConfig = {
        initialState: {
            disputes: [],
        },
        actionOverrides: {},
        extraActions: () => {},
    }
) {
    return createSlice({
        name: "dispute",
        initialState,
        reducers: {
            // REDUCER ACTIONS
            setDisputes(state, action: PayloadAction<Dispute[]>) {
                state.disputes = action.payload;
            },
            concedeDispute(state, action: PayloadAction<string>) {
                const dispute = state.disputes.find(
                    (d) => d.id === action.payload
                );
                if (dispute && dispute.status === DisputeStatusEnum.Open)
                    dispute.status = DisputeStatusEnum.Condeded;
            },
            challengeDispute(state, action: PayloadAction<string>) {
                const dispute = state.disputes.find(
                    (d) => d.id === action.payload
                );
                if (dispute && dispute.status === DisputeStatusEnum.Open)
                    dispute.status = DisputeStatusEnum.Challenged;
            },
            ...opts.actionOverrides,
        },
        extraReducers: (builder) => {
            opts.extraActions(builder);

            // SET DISPUTES WHEN GET_DISPUTES QUERY IS FULFILLED
            builder.addMatcher(
                api.endpoints.getDisputes.matchFulfilled,
                (state, action) => {
                    state.disputes = action.payload;
                }
            );
        },
    });
}
