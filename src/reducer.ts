import {
    ActionReducerMapBuilder,
    PayloadAction,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
    createSlice,
} from "@reduxjs/toolkit";

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

type ConfigReducerOpts = {
    actionOverrides: ValidateSliceCaseReducers<
        DisputeReducerState,
        SliceCaseReducers<DisputeReducerState>
    >;
    initialState: DisputeReducerState;
    extraActions: (
        builder: ActionReducerMapBuilder<DisputeReducerState>
    ) => void;
};

export function configureReducer(
    opts: ConfigReducerOpts = {
        initialState,
        actionOverrides: {},
        extraActions: () => {},
    }
) {
    return createSlice({
        name: "dispute",
        initialState,
        reducers: {
            addDispute(state, action: PayloadAction<Dispute>) {
                state.disputes.push(action.payload);
            },
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
        extraReducers: opts.extraActions,
    });
}

export default configureReducer();
