import { combineReducers, configureStore } from "@reduxjs/toolkit";
import displayState from "./displayState";
import notes from "./notesSlice";

const store = configureStore({
  reducer: {
    notes: notes,
    displayState: displayState,
  },
});

const storeType = () => {
  return store;
};

// export type StoreType = ReturnType<typeof storeType>;

const rootReducer = combineReducers({ notes, displayState });
export type IRootState = ReturnType<typeof rootReducer>;

export default store;
