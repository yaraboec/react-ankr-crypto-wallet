import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Balance } from "types/blockchain";

export interface BalancesState {
  balances: Balance[];
}

const initialState: BalancesState = {
  balances: [],
};

export const balancesSlice = createSlice({
  name: "balances",
  initialState,
  reducers: {
    setBalances: (state, action: PayloadAction<Balance[]>) => {
      state.balances = action.payload;
    },
  },
});

export const { setBalances } = balancesSlice.actions;

export default balancesSlice.reducer;
