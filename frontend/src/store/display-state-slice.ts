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
  user: "",
} as DisplayStateInitialState;

const displayState = createSlice({
  name: "displayManagment",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      console.log({ payload });
      console.log("ss");
      const email = payload;
      state.user = email;
    },
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
    emailAlreadyInUseHandler(state, { payload }) {
      const response = payload;
      console.log(response);
      const isTheEmailAlreadyInUse =
        response.message === ErrorMessages.alreadyInUse;
      state.emailAlreadyInUse = isTheEmailAlreadyInUse;
    },
  },
});

export const {
  setUser,
  loadingInitialState,
  errorState,
  httpReqResLoading,
  displaySideBar,
  openAccountSettings,
  emailAlreadyInUseHandler,
} = displayState.actions;

export default displayState.reducer;
