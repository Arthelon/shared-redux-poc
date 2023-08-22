import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Dispute } from "./disputeSlice";

export type ApiConfig = {
    apiBaseUrl: string;
};

export const DEFAULT_API_URL =
    "https://64e4d4fbc55563802913d3d7.mockapi.io/api/";

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

export default configureApi({
    apiBaseUrl: DEFAULT_API_URL,
});
