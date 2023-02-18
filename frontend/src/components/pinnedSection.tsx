import Note from "./note";
import { Notes } from "./notesSection";

interface Props {
  notes: Notes[];
}

const PinnedSection = ({ notes }: Props) => {
  console.log(notes);
  return (
    <main>
      <h3>Pinned</h3>
      <div>
        {notes.map((n) => {
          return <Note note={note} />;
        })}
      </div>
    </main>
  );
};
export default PinnedSection;
