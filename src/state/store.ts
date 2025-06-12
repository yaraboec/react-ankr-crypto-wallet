import { configureStore } from "@reduxjs/toolkit";

import BalancesReducer from "./slices/balancesSlice";

export const store = configureStore({
  reducer: {
    balances: BalancesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
