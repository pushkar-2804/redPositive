import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedRows: [],
};

const selectedSlice = createSlice({
  name: "selectedRows",
  initialState,
  reducers: {
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
  },
});

export const { setSelectedRows } = selectedSlice.actions;
export default selectedSlice.reducer;
