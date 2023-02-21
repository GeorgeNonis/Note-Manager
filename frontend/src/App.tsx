import { useState } from "react";
import { useOutsideHover } from "./hooks/useOutsideHover";
import { useDispatch } from "react-redux";
import { deleteN } from "./store/notesSlice";
import { onDropBin } from "./utils/utils";
import Notes from "./components/sections/notesSection";
import Deleted from "./components/sections/trashSection";
import { FaTrash, FaTrashRestore } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { FaRegLightbulb } from "react-icons/fa";
import styles from "./styles/content.module.scss";

const App = () => {
  const [mouseOverTrash, setMouseOverTrash] = useState(false);
  const [display, setDisplay] = useState<boolean>(true);
  const dispatch = useDispatch();
  const outside = useOutsideHover(() => setMouseOverTrash(false));
  return (
    <>
      <h3 style={{ textAlign: "center" }}>Note Manager</h3>
      <main className={styles.main}>
        <div
          ref={outside}
          className={styles.BiTrash}
          onMouseEnter={() => {
            setMouseOverTrash(true);
          }}
          onDragEnter={() => {
            setMouseOverTrash(true);
          }}
          onDrop={(e) => {
            onDropBin(e, (id, pinned) => {
              dispatch(deleteN({ id, pinned }));
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
        {/* <Test /> */}
        {display && <Notes />}
        {!display && <Deleted />}
      </main>
    </>
  );
};

export default App;
