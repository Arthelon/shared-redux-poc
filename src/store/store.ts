import { configureStore } from "@reduxjs/toolkit";
import disputeReducer from "./reducer";
const store = configureStore({
    reducer: disputeReducer.reducer,
});

export default store;
