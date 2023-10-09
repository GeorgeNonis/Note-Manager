import { ExistingNoteWrapperProps } from "./interfaces";
import { StyledWrapper } from "./styles";

const ExistingNoteWrapper = ({
  children,
  review,
  note,
  position,
  pinned,
  onClick,
  onDragStart,
  onDragEnter,
  onDragEnd,
  dragable,
}: ExistingNoteWrapperProps) => {
  const getBackgroundStyle = () => {
    if (note.color.includes("#") || note.color === "transparent") {
      return { backgroundColor: "#202124" };
    } else {
      return { backgroundImage: `url(${note.color})` };
    }
  };
  return (
    <StyledWrapper
      css={getBackgroundStyle()}
      review={review}
      onClick={!review ? onClick : undefined}
      draggable={dragable}
      onDragStart={(e) => onDragStart(e, position, pinned, note.id)}
      onDragEnter={(e) => onDragEnter(e, position)}
      onDrop={(e) => onDragEnd(e)}
      onDragOver={(e) => e.preventDefault()}
    >
      {children}
    </StyledWrapper>
  );
};
export default ExistingNoteWrapper;
