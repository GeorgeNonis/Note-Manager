import { createSlice } from "@reduxjs/toolkit";
import { DisplayStateInitialState } from "./interfaces";
import { ErrorMessages } from "../errors/error-messages";

const initialState = {
  review: false,
  loadingInitialState: true,
  error: "",
  httpReqResLoading: false,
  displaySideBar: true,
  isThereError: false,
  accountSettings: false,
  emailAlreadyInUse: false,
  showLoginForm: false,
  fetchingData: false,
} as DisplayStateInitialState;

const displayState = createSlice({
  name: "displayManagment",
  initialState,
  reducers: {
    refreshState(state) {
      state.review = false;
      state.loadingInitialState = true;
      state.error = "";
      state.httpReqResLoading = false;
      state.displaySideBar = true;
      state.isThereError = false;
      state.accountSettings = false;
      state.emailAlreadyInUse = false;
      state.showLoginForm = false;
    },
    loadingInitialState(state, { payload }) {
      state.loadingInitialState = payload;
    },
    errorState(state, { payload: error }) {
      // console.log({ error });
      state.error = error;
    },
    httpReqResLoading(state) {
      state.httpReqResLoading = !state.httpReqResLoading;
    },
    displaySideBar(state) {
      state.displaySideBar = !state.displaySideBar;
    },
    openAccountSettings(state) {
      state.accountSettings = !state.accountSettings;
    },
    emailAlreadyInUseHandler(state, { payload }) {
      const response = payload;

      const isTheEmailAlreadyInUse =
        response.message === ErrorMessages.alreadyInUse;
      state.emailAlreadyInUse = isTheEmailAlreadyInUse;
    },
    formSwitch(state) {
      state.showLoginForm = !state.showLoginForm;
    },
    fetchingDataHandler(state) {
      console.log("initiating again");
      state.fetchingData = !state.fetchingData;
    },
  },
});

export const {
  refreshState,
  loadingInitialState,
  errorState,
  httpReqResLoading,
  displaySideBar,
  openAccountSettings,
  emailAlreadyInUseHandler,
  formSwitch,
  fetchingDataHandler,
} = displayState.actions;

export default displayState.reducer;
