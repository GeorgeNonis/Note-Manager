import { combineReducers, configureStore } from "@reduxjs/toolkit";
import displayState from "./display-state-slice";
import notes from "./notes-slice";

const store = configureStore({
  reducer: {
    notes: notes,
    displayState: displayState,
  },
});

const storeType = () => {
  return store;
};

const rootReducer = combineReducers({ notes, displayState });
export type IRootState = ReturnType<typeof rootReducer>;

export default store;
