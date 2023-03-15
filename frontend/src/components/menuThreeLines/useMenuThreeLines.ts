import {} from "react";
import { useDispatch, useSelector } from "react-redux";
import { displaySideBar } from "../../store/display-state-slice";
import { IRootState } from "../../store/store";

export const useMenuThreeLines = () => {
  const { displaySideBar: BarIsOn } = useSelector(
    (state: IRootState) => state.displayState
  );

  const dispatch = useDispatch();
  const toggleMenuThreeLines = () => {
    dispatch(displaySideBar());
  };

  return {
    toggleMenuThreeLines,
    BarIsOn,
  };
};
