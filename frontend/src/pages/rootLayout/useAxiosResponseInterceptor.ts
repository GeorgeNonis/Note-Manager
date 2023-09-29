import {} from "react";
import axios from "../../services/axios";
import { useDispatch } from "react-redux";
import { errorState } from "../../store/display-state-slice";
import { useLogoutHandler } from "../../hooks/useLogoutHandler";
import { IfNetworkDown } from "../../utils";

const useAxiosREsponseInterceptor = () => {
  const dispatch = useDispatch();
  const { logoutHandler } = useLogoutHandler();

  axios.interceptors.request.use(
    (request) => {
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

      return Promise.reject(err);
    }
  );
  return {};
};
export default useAxiosREsponseInterceptor;
