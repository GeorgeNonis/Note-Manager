import { createSlice } from "@reduxjs/toolkit";
import { Notes } from "../components/notesSection";

interface InitialState {
  notes: Notes[];
  deletedNotes: Notes[];
}

const initialState: InitialState = {
  notes: [],
  deletedNotes: [],
};

type New = Record<string, number | string>;

type Xx = {
  name: string;
  age: string | number;
};

const test = {
  name: "giorgos",
  age: 12,
} satisfies Xx; /** Could use New as well*/

const x = test.name;

const notes = createSlice({
  name: "notes",
  initialState,
  reducers: {
    initial(state, { payload }) {
      state.notes = payload;
      /**
       * Should make 1 request to set up the whole state
       */
      // state.pinned = payload.pinned
      // state.deletedNotes = payload.deletedNotes
    },
    add(state, { payload }) {
      state.notes = [...state.notes, { ...payload }];
    },
    initialDelState(state, { payload }) {
      state.deletedNotes = payload;
    },
    deleteN(state, { payload }) {
      const id = payload;
      const note = state.notes.find((n) => n.id === id) as Notes;
      state.deletedNotes.push(note);

      state.notes = [...state.notes.filter((n) => n.id !== id)];
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
    pinNote(state, { payload: id }) {
      state.notes.forEach((note) => {
        if (note.id !== id) return;
        note.pinned = true;
      });
    },
    unpinNote(state, { payload: id }) {
      state.notes.forEach((note) => {
        if (note.id !== id) return;
        note.pinned = false;
      });
    },
  },
});

export const {
  add,
  deleteN,
  sortNotes,
  sortDelNotes,
  initial,
  initialDelState,
  restoreNote,
  removeNote,
  pinNote,
  unpinNote,
} = notes.actions;

export default notes.reducer;
