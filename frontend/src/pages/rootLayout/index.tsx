import { Outlet, NavLink } from "react-router-dom";
import { FaTrash, FaTrashRestore, FaRegLightbulb } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import styles from "../../styles/App.module.scss";
import { useRootLayout } from "./useRootLayout";
import { MdOutlineLabel } from "react-icons/md";

const RootLayout = () => {
  const { hoverOutsideTrash, state } = useRootLayout();

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Note Manager</h3>
      <main className={styles.main}>
        <div
          ref={hoverOutsideTrash}
          className={styles.BiTrash}
          onMouseEnter={() => {
            state.actions.setMouseOverTrash(true);
          }}
          onDragEnter={() => {
            state.actions.setMouseOverTrash(true);
          }}
          onDrop={state.actions.onDropHandler}
          onDragOver={(e) => e.preventDefault()}
        >
          {!state.values.mouseOverTrash ? <FaTrash /> : <FaTrashRestore />}
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
            to={"deletednotes"}
            role={"button"}
            className={({ isActive }) => {
              return isActive ? styles.active : styles.inactive;
            }}
          >
            <BiTrash />
            <h3>Trash</h3>
          </NavLink>
          {state.labels.map((l) => {
            return (
              <NavLink
                key={l.label}
                to={`labelsnotesection/:${l.label}`}
                role={"button"}
                className={({ isActive }) => {
                  return isActive ? styles.active : styles.inactive;
                }}
              >
                <MdOutlineLabel />
                <h3>{l.label}</h3>
              </NavLink>
            );
          })}

          <a className={styles.inactive} tabIndex={1}>
            <BsPencilSquare />
            <h3>Edit Labels</h3>
          </a>
        </div>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
