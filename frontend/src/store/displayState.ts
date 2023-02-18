import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  review: false,
};

const displayState = createSlice({
  name: "displayManagment",
  initialState,
  reducers: {},
});

export const {} = displayState.actions;

export default displayState.reducer;
