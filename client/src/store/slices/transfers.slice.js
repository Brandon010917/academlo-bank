import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transfers: [],
  error: null,
};

const transfersSlice = createSlice({
  initialState,
  name: "transfers",
  reducers: {
    getTransfers(state, action) {
      state.transfers = action.payload.transfers;
    },
    newTransfer(state, action) {
      const newTransfer = action.payload;

      const updatedTransfers = state.transfers.concat(newTransfer);

      state.transfers = updatedTransfers;
    },
  },
});

export const transfersActions = transfersSlice.actions;
export default transfersSlice.reducer;
