import { MdOutlineLabel } from "react-icons/md";
import { Text } from "../../Atoms";
import { StyledDiv } from "./notes-with-labels-section.styles";

const NoNotesMsg = () => {
  return (
    <StyledDiv>
      <MdOutlineLabel />
      <Text size={"m"} fontWeight={"700"} css={{ color: "gray" }}>
        No notes with this label yet
      </Text>
    </StyledDiv>
  );
};
export default NoNotesMsg;
