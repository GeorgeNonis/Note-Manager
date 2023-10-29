import { useSection } from "./hook";
import { SectionProps } from "./types";
import Note from "../../notes/existing-note/existing-note";
import { StyledNotes, StyledSection } from "./styles";

const Section = ({
  notes,
  dragable = false,
  header,
  pinnedNotes,
}: SectionProps) => {
  const { onDragEnd, onDragEnter, onDragStart } = useSection();
  if (notes.length === 0) return null;
  return (
    <StyledSection>
      {header && <p>{header}</p>}
      <StyledNotes>
        {notes.map((n, i) => {
          return (
            <Note
              pinned={pinnedNotes}
              dragable={dragable}
              position={i}
              note={n}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              onDragStart={onDragStart}
              key={n.id}
            />
          );
        })}
      </StyledNotes>
    </StyledSection>
  );
};
export default Section;
