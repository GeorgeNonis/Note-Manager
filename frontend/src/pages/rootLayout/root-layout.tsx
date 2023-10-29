import ReactDOM from "react-dom";
import { Outlet, NavLink } from "react-router-dom";
import { FaTrash, FaTrashRestore, FaRegLightbulb } from "react-icons/fa";
import { MdOutlineArchive } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { useRootLayout } from "./useRootLayout";
import { MdOutlineLabel, MdOutlineModeEditOutline } from "react-icons/md";
import * as Comp from "../../components";
import styles from "../../styles/App.module.scss";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  const { hoverOutsideTrash, state } = useRootLayout();
  const { loadingInitialState, displaySideBar, accountSettings, fetchingData } =
    state.values.displayState;
  return (
    <>
      {(fetchingData || loadingInitialState) && <Comp.LoadingSpinner />}
      <ToastContainer />
      {ReactDOM.createPortal(
        <Comp.AccountSettings open={accountSettings} />,
        document.getElementById("accountsettings")!
      )}
      {!loadingInitialState && (
        <main
          className={
            displaySideBar
              ? styles.main
              : `${styles.main} ${styles.isSideBarClosed}`
          }
        >
          <Comp.MenuThreeLines />
          <div
            ref={hoverOutsideTrash}
            id="trashbin"
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
          <Comp.Account />
          <div
            className={
              displaySideBar
                ? styles.div
                : `${styles.div} ${styles.isSideBarClosedLinks}`
            }
          >
            <NavLink
              to={"/notes"}
              end
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
                state.values.displayState.error
                  ? styles.disable
                  : styles.inactive
              }
              tabIndex={1}
              onClick={state.actions.labelModalHandler}
            >
              <MdOutlineModeEditOutline />
              <h3>Edit Labels</h3>
            </a>
            <NavLink
              to={"archivenotes"}
              role={"button"}
              className={({ isActive }) => {
                return isActive ? styles.active : styles.inactive;
              }}
            >
              <MdOutlineArchive />
              <h3>Archive</h3>
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
          </div>
          {state.values.editLabelsModal && (
            <Comp.EditLabelsModal
              modalState={state.values.editLabelsModal}
              labelModalHandler={state.actions.labelModalHandler}
            />
          )}
          {!loadingInitialState && <Outlet />}
        </main>
      )}
    </>
  );
};

export default RootLayout;
