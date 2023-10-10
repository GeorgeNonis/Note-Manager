import { DeletedNoteWrapperProps } from "./interfaces";
import { StyledWrapper } from "./styles";

const DeletedNoteWrapper = ({
  children,
  review,
  onClick,
}: DeletedNoteWrapperProps) => {
  return (
    <StyledWrapper
      review={review}
      onClick={!review ? onClick : undefined}
      aria-multiline="true"
    >
      {children}
    </StyledWrapper>
  );
};
export default DeletedNoteWrapper;
