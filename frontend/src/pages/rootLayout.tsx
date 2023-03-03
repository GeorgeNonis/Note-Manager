import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useOutsideHover } from "../hooks/useOutsideHover";
import { useDispatch } from "react-redux";
import { deleteNote } from "../store/notesSlice";
import { onDropBin } from "../utils/utils";
import { FaTrash, FaTrashRestore, FaRegLightbulb } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import styles from "../styles/App.module.scss";

const RootLayout = () => {
  const [mouseOverTrash, setMouseOverTrash] = useState(false);
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
          <NavLink
            to={"notes"}
            role={"button"}
            className={({ isActive }) => {
              return isActive ? styles.active : styles.inactive;
            }}
          >
            <FaRegLightbulb />
            <h3>Your Note's</h3>
          </NavLink>
          <NavLink
            end
            to={"deletednotes"}
            role={"button"}
            className={({ isActive }) => {
              return isActive ? styles.active : styles.inactive;
            }}
          >
            <BiTrash />
            <h3>Trash</h3>
          </NavLink>
          <a className={styles.inactive} tabIndex={1}>
            <BsPencilSquare />
            <h3>Labels</h3>
          </a>
        </div>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
