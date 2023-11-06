import {} from "react";
import { useDispatch } from "react-redux";
import { displaySideBar } from "../../store/display-state-slice";

export const useMenuThreeLines = () => {

  const dispatch = useDispatch();
  const toggleMenuThreeLines = () => {
    dispatch(displaySideBar());
  };

  return {
    toggleMenuThreeLines,
  };
};
