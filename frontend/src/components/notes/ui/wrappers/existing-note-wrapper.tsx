import { ExistingNoteWrapperProps } from "./interfaces";
import { StyledWrapper } from "./styles";

const ExistingNoteWrapper = ({
  children,
  review,
  note,
  position,
  zIndex,
  pinned,
  styles,
  onClick,
  onDragStart,
  onDragEnter,
  onDragEnd,
  dragable,
}: ExistingNoteWrapperProps) => {
  return (
    <StyledWrapper
      css={{
        ...styles,

        ...(note.color.includes("#") || note.color === "transparent"
          ? { bgc: "#202124" }
          : { backgroundImage: `url(${note.color})` }),
      }}
      review={review}
      onClick={onClick}
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
