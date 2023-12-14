import { useArchiveNotesSection } from "./useArchiveNotesSection";
import * as Comp from "../../index";
import NoNotes from "../ui/noNotes";
import { BiArchiveIn } from "react-icons/bi";
import { Grid } from "noniscomponents";

const ArchiveNotesSection = () => {
  const { useStore } = useArchiveNotesSection();
  const {
    values: { archivedNotes },
  } = useStore;

  if (useStore.values.loading) return <Comp.LoadingSpinner />;

  const notes = !useStore.values.loading && archivedNotes.length !== 0 && (
    <Comp.ArchivedNotesSection notes={[...archivedNotes]} />
  );

  return (
    <Grid gap={"16"} css={{ margin: "0 16px" }}>
      {archivedNotes.length > 0 ? (
        notes
      ) : (
        <NoNotes SVG={BiArchiveIn} children={"No archieved Notes yet!"} />
      )}
    </Grid>
  );
};

export default ArchiveNotesSection;
