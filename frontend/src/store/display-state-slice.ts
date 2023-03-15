import { createSlice } from "@reduxjs/toolkit";
import { DisplayStateInitialState } from "./interfaces";

const initialState = {
  review: false,
  loadingInitialState: true,
  error: "",
  httpReqResLoading: false,
  displaySideBar: false,
} as DisplayStateInitialState;

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
    displaySideBar(state) {
      state.displaySideBar = !state.displaySideBar;
      console.log("MAMA GUEVO");
    },
  },
});

export const {
  loadingInitialState,
  errorState,
  httpReqResLoading,
  displaySideBar,
} = displayState.actions;

export default displayState.reducer;
