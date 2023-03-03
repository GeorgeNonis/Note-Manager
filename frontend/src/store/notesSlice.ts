import { createSlice } from "@reduxjs/toolkit";
import { NoteObj } from "../interfaces/interfaces";
import { Labels } from "../services/interfaces";

export interface InitialState {
  notes: NoteObj[];
  pinnedNotes: NoteObj[];
  deletedNotes: NoteObj[];
  labels: Labels[];
  error: "";
}

const initialState: InitialState = {
  notes: [],
  deletedNotes: [],
  pinnedNotes: [],
  labels: [],
  error: "",
};

const notes = createSlice({
  name: "notes",
  initialState,
  reducers: {
    initial(state, { payload }) {
      state.notes = [...payload.unpinned];
      state.pinnedNotes = [...payload.pinned];
      state.deletedNotes = [...payload.deleted];
      state.labels = [...payload.labels];
    },
    addNote(state, { payload }) {
      state.notes = [...state.notes, { ...payload }];
    },
    errorState(state, { payload: error }) {
      console.log(error);
      state.error = error;
    },
    editNote(state, { payload }) {
      const { id, pinned } = payload;

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
      const { id, pinned } = payload;

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
    restoreNote(state, { payload: id }) {
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
    setColor(state, { payload }) {
      const color = payload.value;
      const { id, pinned } = payload;

      let noteIndex;
      if (pinned) {
        noteIndex = state.pinnedNotes.findIndex((n) => n.id === id);
        state.pinnedNotes[noteIndex].color = color;
      } else {
        noteIndex = state.notes.findIndex((n) => n.id === id);
        state.notes[noteIndex].color = color;
      }
    },
    copyNote(state, { payload }) {
      const { id, sharedId, pinned: isItPinned } = payload;

      const note = !isItPinned
        ? state.notes.find((n) => n.id === id)!
        : state.pinnedNotes.find((n) => n.id === id)!;
      console.log(note);
      state.notes = [...state.notes, { ...note, id: sharedId }];
    },
    addLabel(state, { payload }) {
      const { id, label } = payload;

      state.labels.push({ label, notes: [{ id, checked: true }] });
    },
    tickHandler(state, { payload }) {
      const { id, label } = payload;
      const findLabelIndex = state.labels.findIndex((l) => l.label === label);
      const noteIndex = state.labels[findLabelIndex].notes.findIndex(
        (n) => n.id === id
      );
      console.log(findLabelIndex);
      console.log(noteIndex);
      state.labels[findLabelIndex].notes[noteIndex].checked =
        !state.labels[findLabelIndex].notes[noteIndex].checked;
    },
    removeLabel(state, { payload }) {},
  },
});

export const {
  addNote,
  errorState,
  editNote,
  deleteNote,
  sortNotes,
  initial,
  restoreNote,
  removeNote,
  pinHandler,
  setColor,
  copyNote,
  addLabel,
  removeLabel,
  tickHandler,
} = notes.actions;

export default notes.reducer;
