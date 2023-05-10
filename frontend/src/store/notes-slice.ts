import { createSlice } from "@reduxjs/toolkit";
import { NoteObj } from "../interfaces/interfaces";
import { InitialState } from "./interfaces";

const initialState = {
  email: "",
  // password: "",
  date: "",
  lastTimeDitedNote: "",
  image: "",
  notes: [],
  deletedNotes: [],
  pinnedNotes: [],
  archivedNotes: [],
  labels: [],
} as InitialState;

const notes = createSlice({
  name: "notes",
  initialState,
  reducers: {
    initial(state, { payload }) {
      const _doc = payload;
      const { ...rest } = _doc;
      const img = new Image();
      img.src = rest._doc.image;

      state.email = rest._doc.email;
      state.date = rest._doc.date;
      state.lastTimeDitedNote = rest._doc.lastTimeDitedNote;
      state.image = img.src;
      state.notes = [...rest._doc.unPinnedNotes];
      state.pinnedNotes = [...rest._doc.pinnedNotes];
      state.archivedNotes = [...rest._doc.archivedNotes];
      state.deletedNotes = [...rest._doc.deletedNotes];
      state.labels = [...rest._doc.labels];
    },
    logout(state) {
      state.email = "";
      state.date = "";
      state.lastTimeDitedNote = "";
      state.image = "";
      state.notes = [];
      state.pinnedNotes = [];
      state.archivedNotes = [];
      state.deletedNotes = [];
      state.labels = [];
    },
    addNote(state, { payload }) {
      state.notes = [...state.notes, { ...payload }];
    },

    editNote(state, { payload }) {
      const { id, pinned, archived, noteValue, titleValue } = payload;
      const notes = archived
        ? state.archivedNotes
        : pinned
        ? state.pinnedNotes
        : state.notes;
      const noteIndex = notes.findIndex((n) => n.id === id);
      const note = notes[noteIndex];

      note.note = noteValue;
      note.title = titleValue;
    },
    archiveNote(state, { payload }) {
      const { id, pinned } = payload;
      const notes = pinned ? state.pinnedNotes : state.notes;
      const note = notes.find((n) => n.id === id) as NoteObj;
      pinned
        ? (state.pinnedNotes = [...notes.filter((n) => n.id !== id)])
        : (state.notes = [...notes.filter((n) => n.id !== id)]);

      state.archivedNotes.push(note);
    },
    unarchiveNote(state, { payload }) {
      const { id } = payload;
      const note = state.archivedNotes.find((n) => n.id === id) as NoteObj;

      state.archivedNotes = [...state.archivedNotes.filter((n) => n.id !== id)];
      state.notes.push(note);
    },
    deleteNote(state, { payload }) {
      const { id, pinned, archived } = payload;
      const notes = archived
        ? state.archivedNotes
        : pinned
        ? state.pinnedNotes
        : state.notes;
      const note = notes.find((n) => n.id === id) as NoteObj;
      state.deletedNotes.push(note);

      archived
        ? (state.archivedNotes = [
            ...state.archivedNotes.filter((n) => n.id !== id),
          ])
        : pinned
        ? (state.pinnedNotes = [
            ...state.pinnedNotes.filter((n) => n.id !== id),
          ])
        : (state.notes = [...state.notes.filter((n) => n.id !== id)]);
    },
    sortUnpinnedNotes(state, { payload }) {
      const { arr } = payload;

      state.notes = [...arr];
    },
    sortNotes(state, { payload }) {
      const { pinned, arr } = payload;

      pinned ? (state.pinnedNotes = [...arr]) : (state.notes = [...arr]);
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
      const notes = isItPinned ? state.pinnedNotes : state.notes;
      const noteIndex = notes.findIndex((n) => n.id === id);
      const note = notes[noteIndex];

      if (isItPinned) {
        state.pinnedNotes = [...state.pinnedNotes.filter((n) => n.id !== id)];
        state.notes = [...state.notes, note];
      } else {
        state.notes = [...state.notes.filter((n) => n.id !== id)];

        state.pinnedNotes = [...state.pinnedNotes, note];
      }
    },
    setColor(state, { payload }) {
      const { id, pinned, archived, value: color } = payload;
      const notes = archived
        ? state.archivedNotes
        : pinned
        ? state.pinnedNotes
        : state.notes;
      const noteIndex = notes.findIndex((n) => n.id === id);
      const note = notes[noteIndex];
      note.color = color;
    },
    copyNote(state, { payload }) {
      const { id, sharedId, pinned, archived } = payload;
      const notes = archived
        ? state.archivedNotes
        : pinned
        ? state.pinnedNotes
        : state.notes;
      const noteIndex = notes.findIndex((n) => n.id === id);
      const note = notes[noteIndex];

      state.notes = [...state.notes, { ...note, id: sharedId }];
    },
    addLabel(state, { payload }) {
      const { id, label, labelId } = payload;
      if (payload.id) {
        state.labels.push({
          label,
          labelId,
          notes: [{ id, checked: true }],
          token: "",
        });
      } else {
        state.labels.push({
          label,
          labelId,
          notes: [],
          token: "",
        });
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
    checkBoxes(state, { payload }) {
      const { id, pinned, archived, uncheckednote } = payload;
      const notes = archived
        ? state.archivedNotes
        : pinned
        ? state.pinnedNotes
        : state.notes;
      const noteIndex = notes.findIndex((n) => n.id === id);
      const note = notes[noteIndex];

      if (!note.createCheckboxes) {
        note.unChecked = [...uncheckednote];
        note.checked = [];

        note.createCheckboxes = true;
      } else {
        note.unChecked = [];
        note.checked = [];
        note.createCheckboxes = false;
      }

      note.checkbox = !note.checkbox;
    },
    checkBox(state, { payload }) {
      const { id, boxid, checked, pinned, archived } = payload;
      const notes = archived
        ? state.archivedNotes
        : pinned
        ? state.pinnedNotes
        : state.notes;
      const noteIndex = notes.findIndex((n) => n.id === id);
      const note = notes[noteIndex];
      let checkbox;
      if (checked) {
        checkbox = note.checked?.find((b) => b.id === boxid)!;
        note.checked = [...note.checked?.filter((b) => b.id !== boxid)!];
        note.unChecked?.push(checkbox);
      } else {
        checkbox = note.unChecked?.find((b) => b.id === boxid)!;
        note.unChecked = [...note.unChecked?.filter((b) => b.id !== boxid)!];
        note.checked?.push(checkbox);
      }
    },
    lastTimeDitedNoteHandler(state) {
      const curr = new Date();
      curr.setDate(curr.getDate());
      const lastTimeDitedNote = curr.toISOString().substring(0, 10);

      state.lastTimeDitedNote = lastTimeDitedNote;
    },
    changeAvatarProfile(state, { payload }) {
      const image = payload;
      state.image = image;
    },
  },
});

export const {
  initial,
  logout,
  addNote,
  editNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
  sortNotes,
  restoreNote,
  removeNote,
  pinHandler,
  setColor,
  copyNote,
  addLabel,
  deleteLabel,
  tickHandler,
  editLabel,
  checkBoxes,
  checkBox,
  sortUnpinnedNotes,
  lastTimeDitedNoteHandler,
  changeAvatarProfile,
} = notes.actions;

export default notes.reducer;
