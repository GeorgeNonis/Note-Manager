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
      state.notes = [...state.notes, { ...note, id: sharedId }];
    },
    addLabel(state, { payload }) {
      console.log(payload);
      if (payload.id) {
        const { id, label, labelId } = payload;

        state.labels.push({ label, labelId, notes: [{ id, checked: true }] });
      } else {
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
      const indexOfLabel = state.labels.findIndex((l) => l.label === label);

      state.labels[indexOfLabel].label = newLabel;
    },
    checkBoxesPinned(state, { payload }) {
      const { id } = payload;
      let noteIndex = state.pinnedNotes.findIndex((n) => n.id === id);
      const pinnedNote = state.pinnedNotes[noteIndex];

      if (!pinnedNote.createCheckboxes) {
        const setences = pinnedNote.note
          ? pinnedNote.note.split(/\r\n|\r|\n/).filter((el) => el.length > 0)
          : [""];
        const uncheckednote = [
          ...setences.map((s) => {
            return { note: s, id: crypto.randomUUID() };
          }),
        ];
        pinnedNote.unChecked = [...uncheckednote];
        pinnedNote.checked = [];

        pinnedNote.createCheckboxes = true;
      } else {
        pinnedNote.unChecked = [];
        pinnedNote.checked = [];
        pinnedNote.createCheckboxes = false;
      }

      pinnedNote.checkbox = !pinnedNote.checkbox;
    },
    checkBoxesUnPinned(state, { payload }) {
      const { id } = payload;
      let noteIndex = state.notes.findIndex((n) => n.id === id);
      const UnPinnedNote = state.notes[noteIndex];

      if (!UnPinnedNote.createCheckboxes) {
        const setences = UnPinnedNote.note
          ? UnPinnedNote.note.split(/\r\n|\r|\n/).filter((el) => el.length > 0)
          : [""];
        const uncheckednote = [
          ...setences.map((s) => {
            return { note: s, id: crypto.randomUUID() };
          }),
        ];
        UnPinnedNote.unChecked = [...uncheckednote];
        UnPinnedNote.checked = [];

        UnPinnedNote.createCheckboxes = true;
      } else {
        UnPinnedNote.unChecked = [];
        UnPinnedNote.checked = [];
        UnPinnedNote.createCheckboxes = false;
      }

      UnPinnedNote.checkbox = !UnPinnedNote.checkbox;
    },
    checkPinned(state, { payload }) {
      const { id, boxid, checked } = payload;
      const noteIndex = state.pinnedNotes.findIndex((n) => n.id === id);
      const pinnedNote = state.pinnedNotes[noteIndex];
      if (checked) {
        pinnedNote.unChecked = [
          ...pinnedNote.unChecked?.filter((n) => n.id !== boxid)!,
        ];
      } else {
        pinnedNote.checked = [
          ...pinnedNote.checked?.filter((n) => n.id !== boxid)!,
        ];
      }
    },
    checkUnPinned(state, { payload }) {
      const { id, boxid, checked } = payload;
      const noteIndex = state.notes.findIndex((n) => n.id === id);
      const pinnedNote = state.notes[noteIndex];
      let checkbox;

      if (checked) {
        checkbox = pinnedNote.checked?.find((b) => b.id === boxid);
        pinnedNote.checked = [
          ...pinnedNote.checked?.filter((n) => n.id !== boxid)!,
        ];
        pinnedNote.unChecked?.push(checkbox!);
      } else {
        checkbox = pinnedNote.unChecked?.find((b) => b.id === boxid);
        pinnedNote.unChecked = [
          ...pinnedNote.unChecked?.filter((n) => n.id !== boxid)!,
        ];
        pinnedNote.checked?.push(checkbox!);
      }
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
  checkBoxesPinned,
  checkBoxesUnPinned,
  checkPinned,
  checkUnPinned,
} = notes.actions;

export default notes.reducer;
