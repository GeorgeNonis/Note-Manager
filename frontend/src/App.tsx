import { Suspense, useState } from "react";
import Deleted from "./components/trashSection";
import Notes from "./components/notesSection";
import { FaTrash, FaTrashRestore } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { FaRegLightbulb } from "react-icons/fa";
import styles from "./styles/content.module.scss";
import { useOutsideHover } from "./hooks/useOutsideHover";
import { deleteNoteHttp } from "./api/api";
import { useDispatch } from "react-redux";
import { deleteN } from "./store/notesSlice";
import { onDropBin } from "./utils/utils";

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
            // const id = e.dataTransfer.getData("id");
            // const pinned =
            //   e.dataTransfer.getData("pinned") === "false" ? false : true;
            // if (id.length === 0) return;
            // if (window.confirm("Are you sure you wanna delete this note?")) {
            //   dispatch(deleteN({ id, pinned }));
            //   deleteNoteHttp(id, pinned);
            // }
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
            className={`${display ? styles.active : styles.inactive}`}
            onClick={() => setDisplay(true)}
          >
            <FaRegLightbulb />
            <h3>Your Note's</h3>
          </div>
          <div
            className={`${!display ? styles.active : styles.inactive}`}
            onClick={() => setDisplay(false)}
          >
            <BiTrash />
            <h3>Trash</h3>
          </div>
        </div>
        {/* <Test /> */}
        {display && (
          <Suspense fallback={<p>Loading...</p>}>
            <Notes />
          </Suspense>
        )}
        {!display && (
          <Suspense fallback={<p>Loading...</p>}>
            <Deleted />
          </Suspense>
        )}
      </main>
    </>
  );
};

export default App;
