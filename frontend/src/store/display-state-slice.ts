import { createSlice } from "@reduxjs/toolkit";
import { DisplayStateInitialState } from "./interfaces";

const initialState = {
  review: false,
  loadingInitialState: true,
  error: "",
  httpReqResLoading: false,
  displaySideBar: true,
  isThereError: false,
  accountSettings: false,
} as DisplayStateInitialState;

const displayState = createSlice({
  name: "displayManagment",
  initialState,
  reducers: {
    loadingInitialState(state, { payload }) {
      state.loadingInitialState = payload;
    },
    errorState(state, { payload: error }) {
      // console.log(error);
      state.error = error;
    },
    httpReqResLoading(state) {
      state.httpReqResLoading = !state.httpReqResLoading;
      // console.log("Changing");
    },
    displaySideBar(state) {
      state.displaySideBar = !state.displaySideBar;
      // console.log("MAMA GUEVO");
    },
    openAccountSettings(state) {
      console.log("clicking");
      state.accountSettings = !state.accountSettings;
    },
  },
});

export const {
  loadingInitialState,
  errorState,
  httpReqResLoading,
  displaySideBar,
  openAccountSettings,
} = displayState.actions;

export default displayState.reducer;
