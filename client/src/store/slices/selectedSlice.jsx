import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  selectedRows: [],
};

export const sendSelectedDataByEmail = createAsyncThunk(
  "selectedRows/sendSelectedDataByEmail",
  async ({ selectedRows, email }) => {
    try {
      console.log(selectedRows, email);
      await axios.post("", {
        selectedRows,
        email,
      });

      toast.success("Email has been sent!");
    } catch (error) {
      toast.error("Failed to send email!");
      throw error;
    }
  }
);

const selectedSlice = createSlice({
  name: "selectedRows",
  initialState,
  reducers: {
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendSelectedDataByEmail.fulfilled, (state) => {
      state.selectedRows = [];
    });
  },
});

export const { setSelectedRows } = selectedSlice.actions;
export default selectedSlice.reducer;
