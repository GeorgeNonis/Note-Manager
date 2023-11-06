import ReactDOM from "react-dom";
import { Outlet } from "react-router-dom";
import { useRootLayout } from "./useRootLayout";
import * as Comp from "../../components";
import { ToastContainer } from "react-toastify";
import Menu from "./comps/menu";

const RootLayout = () => {
  const { state } = useRootLayout();
  const { loadingInitialState, accountSettings, fetchingData } =
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
        <Menu onClick={state.actions.labelModalHandler}>
          {state.values.editLabelsModal && (
            <Comp.EditLabelsModal
              modalState={state.values.editLabelsModal}
              labelModalHandler={state.actions.labelModalHandler}
            />
          )}
          {!loadingInitialState && <Outlet />}
        </Menu>
      )}
    </>
  );
};

export default RootLayout;
