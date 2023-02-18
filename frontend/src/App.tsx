import { Suspense, useState } from "react";
import Deleted from "./components/trashSection";
import Notes from "./components/notesSection";
import styles from "./styles/content.module.scss";
import { BiTrash } from "react-icons/bi";
import { FaRegLightbulb } from "react-icons/fa";

const App = () => {
  const [display, setDisplay] = useState<boolean>(true);

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Note Manager</h3>
      <main className={styles.main}>
        <div className={styles.div}>
          <div className={`${display ? styles.active : ""}`}>
            <FaRegLightbulb />
            <h3 onClick={() => setDisplay(true)}>Your Note's</h3>
          </div>
          <div className={`${!display ? styles.active : ""}`}>
            <BiTrash />
            <h3 onClick={() => setDisplay(false)}>Trash</h3>
          </div>
        </div>
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
