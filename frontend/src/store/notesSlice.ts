import { createSlice } from "@reduxjs/toolkit";
import { Notes } from "../components/notesSection";

interface InitialState {
  notes: Notes[];
  pinnedNotes: Notes[];
  deletedNotes: Notes[];
}

const initialState: InitialState = {
  notes: [],
  deletedNotes: [],
  pinnedNotes: [],
};

const notes = createSlice({
  name: "notes",
  initialState,
  reducers: {
    initial(state, { payload }) {
      // console.log(payload);
      state.notes = [...payload.unpinned];
      state.pinnedNotes = [...payload.pinned];
      state.deletedNotes = [...payload.deleted];
    },
    add(state, { payload }) {
      state.notes = [...state.notes, { ...payload }];
    },
    deleteN(state, { payload }) {
      const id = payload.id;
      const pinned = payload.pinned;
      console.log(payload);
      console.log(pinned);
      let note;
      if (!pinned) {
        console.log("Not pinned");
        note = state.notes.find((n) => n.id === id) as Notes;
        state.notes = [...state.notes.filter((n) => n.id !== id)];
        state.deletedNotes.push(note);
      } else {
        console.log("Pinned");
        note = state.pinnedNotes.find((n) => n.id === id) as Notes;
        state.pinnedNotes = [...state.pinnedNotes.filter((n) => n.id !== id)];
        state.deletedNotes.push(note);
      }
    },
    sortNotes(state, { payload }) {
      state.notes = payload;
    },
    sortDelNotes(state, { payload }) {
      state.deletedNotes = payload;
    },
    restoreNote(state, { payload }) {
      const id = payload;
      const note = state.deletedNotes.find((n) => n.id === id);
      console.log(note);
      state.deletedNotes = [...state.deletedNotes.filter((n) => n.id !== id)];
      state.notes = [...state.notes, { ...note! }];
    },
    removeNote(state, { payload: id }) {
      state.deletedNotes = [...state.deletedNotes.filter((n) => n.id !== id)];
    },
    pinHandler(state, { payload: id }) {
      const isItPinned = state.pinnedNotes.some((n) => n.id === id);
      if (isItPinned) {
        const note = state.pinnedNotes.find((n) => n.id === id)!;
        state.pinnedNotes = [...state.pinnedNotes.filter((n) => n.id !== id)];

        state.notes = [...state.notes, note];
      } else {
        const note = state.notes.find((n) => n.id === id)!;
        state.notes = [...state.notes.filter((n) => n.id !== id)];

        state.pinnedNotes = [...state.pinnedNotes, note];
      }
    },
    sortPinnedNotes(state, { payload }) {
      state.pinnedNotes = payload;
    },
  },
});

export const {
  add,
  deleteN,
  sortNotes,
  sortDelNotes,
  initial,
  restoreNote,
  removeNote,
  pinHandler,
  sortPinnedNotes,
} = notes.actions;

export default notes.reducer;
