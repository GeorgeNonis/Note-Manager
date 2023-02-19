import { Suspense, useState } from "react";
import Deleted from "./components/trashSection";
import Notes from "./components/notesSection";
import styles from "./styles/content.module.scss";
import { BiTrash } from "react-icons/bi";
import { FaRegLightbulb } from "react-icons/fa";
import Test from "./components/test";

const App = () => {
  const [display, setDisplay] = useState<boolean>(true);
  return (
    <>
      <h3 style={{ textAlign: "center" }}>Note Manager</h3>
      <main className={styles.main}>
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
