import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { deleteNoteHttp } from "../api/api";
import { deleteN } from "../store/notesSlice";
import { useDispatch } from "react-redux/es/exports";
import { BsImage } from "react-icons/bs";
import { IoMdColorPalette } from "react-icons/io";
import { AiOutlineBell } from "react-icons/ai";
import ColorPallete from "./colorPallete";
import styles from "../styles/note.module.scss";

type Id = {
  id: string;
  pinned: boolean;
};

const Options = ({ id, pinned }: Id) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState<boolean>(false);
  const [displayPalette, setDisplayPalette] = useState<boolean>(false);
  const outsideOptions = useOutsideClick(() => setDisplay(false));
  const outsidePalette = useOutsideClick(() => setDisplayPalette(false));

  const deleteHandler = useCallback(
    async (e: React.MouseEvent<HTMLHeadElement>) => {
      e.stopPropagation();
      if (window.confirm("Are you sure you wanna delete this note?")) {
        console.log("Deleting");
        await deleteNoteHttp(id, pinned);
        console.log(pinned);
        dispatch(deleteN({ id, pinned }));
        setDisplay(!display);
      }
    },
    []
  );
  console.log(display);
  return (
    <div className={styles.optionsContent} onClick={(e) => e.stopPropagation()}>
      <div className={styles.style}>
        <div
          onClick={() => setDisplayPalette(!displayPalette)}
          className={styles.option}
        >
          <IoMdColorPalette />
          <h3>Background Options</h3>
        </div>
        <div className={styles.option}>
          <BsImage />
          <h3>Upload Image</h3>
        </div>
        <div className={styles.option}>
          <AiOutlineBell />
          <h3>Remind me</h3>
        </div>
        <div
          className={styles.option}
          onClick={(e) => {
            e.stopPropagation();
            setDisplay(!display);
          }}
        >
          ...
          <h3 className={display ? styles.hide : undefined}>More Tools</h3>
        </div>
      </div>
      {displayPalette && (
        <div ref={outsidePalette}>
          <ColorPallete
            closePalette={setDisplayPalette}
            id={id}
            pinned={pinned}
          />
        </div>
      )}
      {display && (
        <div className={styles.options} ref={outsideOptions}>
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
