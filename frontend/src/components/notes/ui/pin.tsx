import { NotePinProps } from "./interfaces";
import { BsPinAngle, BsFillPinFill } from "react-icons/bs";
import { Icon, StyledPin, StyledPinnedIcon, StyledSpan } from "./styles";

const Pin = ({ pinned, pinNoteHandler, review }: NotePinProps) => {
  return (
    <StyledPin onClick={pinNoteHandler}>
      {pinned ? (
        <StyledPinnedIcon as={BsFillPinFill} />
      ) : (
        <Icon as={BsPinAngle} rotate={true} />
      )}
      <StyledSpan>{pinned ? "Unpin Note" : "Pin note"}</StyledSpan>
    </StyledPin>
  );
};
export default Pin;
