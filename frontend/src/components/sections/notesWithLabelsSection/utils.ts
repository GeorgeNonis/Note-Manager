import { NoteObj } from "../../../interfaces/interfaces";
import { Labels } from "../../../services/interfaces";

export const findPinnedNotes = (arr: NoteObj[], currentLabel: Labels) => {
  const pinnedNotes: NoteObj[] = [];
  console.log("Before error");
  console.log(currentLabel);
  console.log(currentLabel.notes);
  currentLabel.notes &&
    currentLabel.notes.forEach((vl) => {
      arr.forEach((note) => {
        note.id === vl.id && vl.checked && pinnedNotes.push(note);
      });
    });

  return pinnedNotes;
};

export const findUnpinnedNotes = (arr: NoteObj[], currentLabel: Labels) => {
  const unPinnedNotes: NoteObj[] = [];
  currentLabel.notes.forEach((vl) => {
    arr.forEach((note) => {
      note.id === vl.id && vl.checked && unPinnedNotes.push(note);
    });
  });

  return unPinnedNotes;
};
