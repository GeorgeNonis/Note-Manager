import { createSlice } from "@reduxjs/toolkit";
import { NoteObj } from "../interfaces/interfaces";
import { InitialState } from "./interfaces";

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
      console.log(payload);
      console.log({ id, pinned });
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
      // console.log(state)
    },
    addLabel(state, { payload }) {
      console.log(payload);
      if (payload.id) {
        const { id, label, labelId } = payload;

        console.log("im create a new object with id and label");
        state.labels.push({ label, labelId, notes: [{ id, checked: true }] });
      } else {
        console.log("im create a new object with ONLY label");

        const { label, labelId } = payload;
        state.labels.push({ label, labelId, notes: [] });
      }
    },
    tickHandler(state, { payload }) {
      const { id, label } = payload;
      const findLabelIndex = state.labels.findIndex((l) => l.label === label);
      const noteIndex = state.labels[findLabelIndex].notes.findIndex(
        (n) => n.id === id
      );
      console.log(findLabelIndex);
      console.log(noteIndex);
      if (noteIndex >= 0) {
        state.labels[findLabelIndex].notes[noteIndex].checked =
          !state.labels[findLabelIndex].notes[noteIndex].checked;
      } else {
        state.labels[findLabelIndex].notes.push({ id, checked: true });
      }
    },
    deleteLabel(state, { payload }) {
      const label = payload as string;
      state.labels = [...state.labels.filter((l) => l.label !== label)];
    },

    editLabel(state, { payload }) {
      const { label, newLabel } = payload;
      console.log({ label });
      console.log({ newLabel });
      const indexOfLabel = state.labels.findIndex((l) => l.label === label);
      console.log({ indexOfLabel });

      state.labels[indexOfLabel].label = newLabel;
    },
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
  deleteLabel,
  tickHandler,
  editLabel,
} = notes.actions;

export default notes.reducer;
