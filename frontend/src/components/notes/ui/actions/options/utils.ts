import { NoteObj } from "../../../../../interfaces/interfaces";

interface CreateCheckBoxes {
  note: NoteObj;
}

export const CreateCheckBoxes = ({ note }: CreateCheckBoxes) => {
  const setences = note.note
    ? note.note.split(/\r\n|\r|\n/).filter((el) => el.length > 0)
    : [""];
  const uncheckednote = [
    ...setences.map((s) => {
      return { note: s, id: crypto.randomUUID() };
    }),
  ];
  return { uncheckednote };
};
