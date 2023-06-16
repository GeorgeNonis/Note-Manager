import ReactDOM from "react-dom";
import { Transition } from "react-transition-group";
import { Outlet, NavLink } from "react-router-dom";
import { FaTrash, FaTrashRestore, FaRegLightbulb } from "react-icons/fa";
import { MdOutlineArchive } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { useRootLayout } from "./useRootLayout";
import { MdOutlineLabel, MdOutlineModeEditOutline } from "react-icons/md";
import * as Comp from "../../components";
import styles from "../../styles/App.module.scss";

const RootLayout = () => {
  const { hoverOutsideTrash, state } = useRootLayout();
  const {
    error,
    loadingInitialState,
    displaySideBar,
    httpReqResLoading,
    accountSettings,
    fetchingData,
  } = state.values.displayState;
  return (
    <>
      {loadingInitialState && <Comp.LoadingSpinner />}
      {!loadingInitialState && (
        <main
          className={
            displaySideBar
              ? styles.main
              : `${styles.main} ${styles.isSideBarClosed}`
          }
          style={{
            cursor: httpReqResLoading ? "progress" : "auto",
            pointerEvents: fetchingData ? "none" : "auto",
          }}
        >
          <Comp.MenuThreeLines />
          {error.length > 0 && <Comp.ErrorWithFeature message={error} />}
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
          <Transition
            in={accountSettings}
            timeout={500}
            mountOnEnter
            unmountOnExit
          >
            {(transState) =>
              ReactDOM.createPortal(
                <Comp.AccountSettings transitionState={transState} />,
                document.getElementById("accountsettings")!
              )
            }
          </Transition>
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
              onClick={() => state.actions.setEditLabelsModal(true)}
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
          <Transition
            in={state.values.editLabelsModal}
            timeout={500}
            mountOnEnter
            unmountOnExit
          >
            {(transState) =>
              ReactDOM.createPortal(
                <Comp.EditLabelsModal
                  transState={transState}
                  closeModal={state.actions.setEditLabelsModal}
                />,
                document.getElementById("editLabelsModal")!
              )
            }
          </Transition>

          {/* {loadingInitialState && <Comp.LoadingSpinner />} */}

          {!loadingInitialState && <Outlet />}
        </main>
      )}
    </>
  );
};

export default RootLayout;
