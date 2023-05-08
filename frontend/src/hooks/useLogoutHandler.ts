import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/notes-slice";
import { refreshState } from "../store/display-state-slice";

export const useLogoutHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    sessionStorage.clear();
    dispatch(logout());
    dispatch(refreshState());
    navigate("/");
  };

  return { logoutHandler };
};
