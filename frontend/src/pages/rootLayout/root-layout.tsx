import ReactDOM from "react-dom";
import { Outlet, NavLink } from "react-router-dom";
import { FaTrash, FaTrashRestore, FaRegLightbulb } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { useRootLayout } from "./useRootLayout";
import { MdOutlineLabel, MdOutlineModeEditOutline } from "react-icons/md";
import {
  EditLabelsModal,
  ErrorFetching,
  LoadingSpinner,
} from "../../components";
import styles from "../../styles/App.module.scss";
import { ExistingNotesStoreProvider } from "../../components/sections/existing-notes-section/existing-notes-store";

const RootLayout = () => {
  const { hoverOutsideTrash, state } = useRootLayout();
  const { error, loadingInitialState } = state.values.displayState;

  return (
    <>
      <h3 className={styles.appTitle}>Note Manager</h3>
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
            <h3>Notes</h3>
          </NavLink>

          {state.labels.map((l) => {
            return (
              <NavLink
                key={l.label}
                to={`labelsnotesection/:${l.labelId}`}
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

          <a
            className={
              state.values.displayState.error ? styles.disable : styles.inactive
            }
            tabIndex={1}
            onClick={() => state.actions.setEditLabelsModal(true)}
          >
            <MdOutlineModeEditOutline />
            <h3>Edit Labels</h3>
          </a>
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
        </div>
        {state.values.editLabelsModal &&
          ReactDOM.createPortal(
            <EditLabelsModal closeModal={state.actions.setEditLabelsModal} />,
            document.getElementById("editLabelsModal")!
          )}

        {loadingInitialState && <LoadingSpinner />}
        {error && <ErrorFetching errorMessage={error} />}

        {!loadingInitialState && (
          <ExistingNotesStoreProvider>
            <Outlet />
          </ExistingNotesStoreProvider>
        )}
      </main>
    </>
  );
};

export default RootLayout;
