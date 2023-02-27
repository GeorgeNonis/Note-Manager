import { useState } from "react";
import { useOutsideHover } from "./hooks/useOutsideHover";
import { useDispatch } from "react-redux";
import { deleteNote } from "./store/notesSlice";
import { onDropBin } from "./utils/utils";
import { DeletedNotesSection, ExistinNotesSection } from "./components";
import { FaTrash, FaTrashRestore } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { FaRegLightbulb } from "react-icons/fa";
import styles from "./styles/App.module.scss";

const App = () => {
  const [mouseOverTrash, setMouseOverTrash] = useState(false);
  const [display, setDisplay] = useState<boolean>(true);
  const dispatch = useDispatch();
  const hoverOutsideTrash = useOutsideHover(() => setMouseOverTrash(false));
  return (
    <>
      <h3 style={{ textAlign: "center" }}>Note Manager</h3>
      <main className={styles.main}>
        <div
          ref={hoverOutsideTrash}
          className={styles.BiTrash}
          onMouseEnter={() => {
            setMouseOverTrash(true);
          }}
          onDragEnter={() => {
            setMouseOverTrash(true);
          }}
          onDrop={async (e) => {
            await onDropBin(e, (id, pinned) => {
              dispatch(deleteNote({ id, pinned }));
            });
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          {!mouseOverTrash ? <FaTrash /> : <FaTrashRestore />}
        </div>
        <div className={styles.div}>
          <div
            role={"button"}
            className={`${display ? styles.active : styles.inactive}`}
            onClick={() => setDisplay(true)}
          >
            <FaRegLightbulb />
            <h3>Your Note's</h3>
          </div>
          <div
            role={"button"}
            className={`${!display ? styles.active : styles.inactive}`}
            onClick={() => setDisplay(false)}
          >
            <BiTrash />
            <h3>Trash</h3>
          </div>
        </div>
        {display && <ExistinNotesSection />}
        {!display && <DeletedNotesSection />}
      </main>
    </>
  );
};

export default App;
