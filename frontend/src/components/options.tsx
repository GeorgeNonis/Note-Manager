import styles from "../styles/note.module.scss";
import { useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { deleteNote } from "../api/api";
import { deleteN } from "../store/notesSlice";
import { useDispatch } from "react-redux/es/exports";
import { BsImage } from "react-icons/bs";
import { IoMdColorPalette } from "react-icons/io";
import { AiOutlineBell } from "react-icons/ai";

type Id = {
  id: string;
};

const Options = ({ id }: Id) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState<boolean>(false);
  const outside = useOutsideClick(() => setDisplay(false));

  const deleteHandler = async (e: React.MouseEvent<HTMLHeadElement>) => {
    e.stopPropagation();
    console.log("Deleting");
    await deleteNote(id);
    dispatch(deleteN(id));
    setDisplay(!display);
  };
  return (
    <div className={styles.optionsContent} onClick={(e) => e.stopPropagation()}>
      <div className={styles.style}>
        <div>
          <IoMdColorPalette />
          <h3>Background Options</h3>
        </div>
        <div>
          <BsImage />
          <h3>Upload Image</h3>
        </div>
        <div>
          <AiOutlineBell />
          <h3>Remind me</h3>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setDisplay(!display);
          }}
        >
          ...
          <h3 className={display ? styles.hide : undefined}>More Tools</h3>
        </div>
      </div>
      {display && (
        <div className={styles.options} ref={outside}>
          <h3 onClick={deleteHandler}>Delete</h3>
          <h3>Add Label</h3>
          <h3>Make Copy</h3>
          <h3>Show Checkboxes</h3>
        </div>
      )}
    </div>
  );
};

export default Options;
