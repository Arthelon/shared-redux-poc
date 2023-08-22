import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Dispute } from "./disputeSlice";

export type ApiConfig = {
    apiBaseUrl: string;
};

export const configureApi = (config: ApiConfig) => {
    return createApi({
        reducerPath: "api",
        baseQuery: fetchBaseQuery({ baseUrl: config.apiBaseUrl }),
        endpoints: (builder) => ({
            getDisputes: builder.query<Dispute[], void>({
                query: () => "/disputes",
            }),
        }),
    });
};
