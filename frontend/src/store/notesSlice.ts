import { createSlice } from "@reduxjs/toolkit";
import { NoteObj } from "../interfaces/interfaces";

export interface InitialState {
  notes: NoteObj[];
  pinnedNotes: NoteObj[];
  deletedNotes: NoteObj[];
  error: "";
}

const initialState: InitialState = {
  notes: [],
  deletedNotes: [],
  pinnedNotes: [],
  error: "",
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
    errorState(state, { payload: error }) {
      state.error = error;
    },
    editNote(state, { payload }) {
      const pinned = payload.pinned;
      const id = payload.noteId;
      let noteIndex;
      if (pinned) {
        noteIndex = state.pinnedNotes.findIndex((n) => n.id === id);
        state.pinnedNotes[noteIndex].note = payload.noteValue;
        state.pinnedNotes[noteIndex].title = payload.titleValue;
      } else {
        noteIndex = state.notes.findIndex((n) => n.id === id);
        state.notes[noteIndex].note = payload.noteValue;
        state.notes[noteIndex].title = payload.titleValue;
      }
    },
    deleteNote(state, { payload }) {
      const id = payload.id;
      const pinned = payload.pinned;
      let note;
      if (!pinned) {
        console.log(state.notes);
        note = state.notes.find((n) => n.id === id) as NoteObj;
        state.notes = [...state.notes.filter((n) => n.id !== id)];
        state.deletedNotes.push(note);
      } else {
        note = state.pinnedNotes.find((n) => n.id === id) as NoteObj;
        state.pinnedNotes = [...state.pinnedNotes.filter((n) => n.id !== id)];
        state.deletedNotes.push(note);
      }
    },
    sortNotes(state, { payload }) {
      console.log(payload);
      if (payload.pinned) {
        state.pinnedNotes = [...payload.arr];
      } else {
        state.notes = [...payload.arr];
      }
    },
    restoreNote(state, { payload }) {
      const id = payload;
      const note = state.deletedNotes.find((n) => n.id === id);
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
    setColor(state, { payload }) {
      const color = payload.value;
      const id = payload.id;
      const pinned = payload.pinned;

      let noteIndex;
      if (pinned) {
        noteIndex = state.pinnedNotes.findIndex((n) => n.id === id);
        state.pinnedNotes[noteIndex].color = color;
      } else {
        noteIndex = state.notes.findIndex((n) => n.id === id);
        state.notes[noteIndex].color = color;
      }
    },
  },
});

export const {
  add,
  errorState,
  editNote,
  deleteNote,
  sortNotes,
  initial,
  restoreNote,
  removeNote,
  pinHandler,
  sortPinnedNotes,
  setColor,
} = notes.actions;

export default notes.reducer;
