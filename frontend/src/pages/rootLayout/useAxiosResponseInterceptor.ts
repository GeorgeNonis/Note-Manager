import {} from "react";
import axios from "../../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import {
  errorState,
  fetchingDataHandler,
} from "../../store/display-state-slice";
import { useLogoutHandler } from "../../hooks/useLogoutHandler";
import { IfNetworkDown } from "../../utils";

const useAxiosREsponseInterceptor = () => {
  const dispatch = useDispatch();
  const displayState = useSelector((state: IRootState) => state.displayState);
  const { logoutHandler } = useLogoutHandler();
  const error = "";

  axios.interceptors.request.use(
    (request) => {
      dispatch(fetchingDataHandler());
      return request;
    },
    (err) => {
      return Promise.reject;
    }
  );

  /**
   * Response
   */
  axios.interceptors.response.use(
    (response) => {
      displayState.error.length > 0 && dispatch(errorState(error));
      dispatch(fetchingDataHandler());
      return response;
    },
    (err) => {
      const {
        response: { status },
        message,
      } = err;
      if (status == 401) {
        logoutHandler();
      } else if (status === 500) {
        dispatch(errorState(IfNetworkDown(message)));
      } else {
        dispatch(errorState(status.toString()));
      }
      dispatch(fetchingDataHandler());
      return Promise.reject(err);
    }
  );
  return {};
};
export default useAxiosREsponseInterceptor;
