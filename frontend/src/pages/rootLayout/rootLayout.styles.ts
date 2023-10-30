import { styled } from "../../../globalStyles";
import Svg from "../../components/modals/editLabelsModal/components/svg";

export const StyledTrash = styled(Svg, {
  w: "$1",
  h: "$1",
  position: "fixed",
  bottom: "1rem",
  right: "1rem",
  zIndex: 18,
});
