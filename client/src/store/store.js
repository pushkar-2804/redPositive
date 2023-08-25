import { configureStore } from "@reduxjs/toolkit";
import selectedRowsReducer from "./slices/selectedSlice";
import dataReducer from "./slices/dataSlice";

const store = configureStore({
  reducer: {
    selectedRows: selectedRowsReducer,
    alldata: dataReducer,
  },
});

export default store;
