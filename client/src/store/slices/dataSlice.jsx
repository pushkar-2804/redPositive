import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alldata: [],
};

const dataSlice = createSlice({
  name: "alldata",
  initialState,
  reducers: {
    setAllData: (state, action) => {
      state.alldata = action.payload;
    },
    fetchData: (state, action) => {
      const { _id } = action.payload;
      const data = state.alldata.find((item) => item._id === _id);
      state.dataToUpdate = data;
    },
  },
});

export const { setAllData, fetchData } = dataSlice.actions;
export default dataSlice.reducer;
