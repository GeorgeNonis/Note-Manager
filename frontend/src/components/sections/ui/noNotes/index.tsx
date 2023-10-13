import { StyledDiv } from "./styles";
import { Text } from "../../../Atoms";
import { NoNotesProps } from "./types";

const NoNotes = ({ SVG, children }: NoNotesProps) => {
  return (
    <StyledDiv>
      <SVG />
      <Text size={"m"} fontWeight={"700"} css={{ color: "gray" }}>
        {children}
      </Text>
    </StyledDiv>
  );
};
export default NoNotes;
