import ReactDOM from "react-dom";
import { Outlet, NavLink } from "react-router-dom";
import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlineArchive } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { useRootLayout } from "./useRootLayout";
import { MdOutlineModeEditOutline } from "react-icons/md";
import * as Comp from "../../components";
import styles from "../../styles/App.module.scss";
import { ToastContainer } from "react-toastify";
import Link from "./comps/link";
import LabelLinks from "./comps/menu/comps/labels-links";

const RootLayout = () => {
  const { state } = useRootLayout();
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
          <Comp.Account />
          <div
            className={
              displaySideBar
                ? styles.div
                : `${styles.div} ${styles.isSideBarClosedLinks}`
            }
          >
            <Link to={"/notes"} end>
              <FaRegLightbulb />
              <h3>Notes</h3>
            </Link>
            <LabelLinks />
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
            <Link to={"archivenotes"}>
              <MdOutlineArchive />
              <h3>Archive</h3>
            </Link>
            <Link to={"deletednotes"}>
              <BiTrash />
              <h3>Trash</h3>
            </Link>
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
