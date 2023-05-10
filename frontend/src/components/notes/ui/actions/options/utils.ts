import { v4 as uuidv4 } from "uuid";
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
      return { note: s, id: uuidv4() };
    }),
  ];
  return { uncheckednote };
};
