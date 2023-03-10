import { createSlice } from "@reduxjs/toolkit";
import { DisplayStateInitialState } from "./interfaces";

const initialState: DisplayStateInitialState = {
  review: false,
  loadingInitialState: true,
  error: "",
};

const displayState = createSlice({
  name: "displayManagment",
  initialState,
  reducers: {
    loadingInitialState(state, { payload }) {
      state.loadingInitialState = payload;
    },
    errorState(state, { payload: error }) {
      console.log(error);
      state.error = error;
    },
  },
});

export const { loadingInitialState, errorState } = displayState.actions;

export default displayState.reducer;
