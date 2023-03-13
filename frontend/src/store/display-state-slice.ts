import { createSlice } from "@reduxjs/toolkit";
import { DisplayStateInitialState } from "./interfaces";

const initialState: DisplayStateInitialState = {
  review: false,
  loadingInitialState: true,
  error: "",
  httpReqResLoading: false,
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
    httpReqResLoading(state) {
      state.httpReqResLoading = !state.httpReqResLoading;
      console.log("Changing");
    },
  },
});

export const { loadingInitialState, errorState, httpReqResLoading } =
  displayState.actions;

export default displayState.reducer;
