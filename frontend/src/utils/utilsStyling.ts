import { Notes } from "../interfaces/interfaces";

interface Props {
  review: boolean;
  note: Notes;
}

interface ReviewingFnc {
  review: boolean;
  styles: CSSModuleClasses;
}

interface FormBordersFnc {
  styles: CSSModuleClasses;
  display: boolean;
}

export const colorLogic = ({ review, note }: Props) => {
  if (review) {
    return note.color === "transparent" ? "#242424" : note.color;
  }
  return note.color;
};

export const onReviewingNote = ({ review, styles }: ReviewingFnc) => {
  return !review ? styles.note : `${styles.note} ${styles.review}`;
};

export const formBorders = ({ styles, display }: FormBordersFnc) => {
  return `${styles.noteInput} ${
    !display ? styles.noteInput : styles.noteBorders
  }`;
};
