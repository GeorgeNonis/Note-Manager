import {
  LoadingSpinner,
  Form,
  // , Grid
} from "../../index";
import { Grid } from "noniscomponents";

import { useExistingNotesSection } from "./useExistingNotesSection";
import Section from "../section/section";
import NoNotes from "../ui/noNotes";
import { BiNotepad } from "react-icons/bi";

const ExistinNotesSection = () => {
  const { useStore } = useExistingNotesSection();
  const { pinnedNotes, notes } = useStore.values.state;

  const isThereAnyNotes = pinnedNotes.length === 0 && notes.length === 0;
  if (useStore.values.loading) return <LoadingSpinner />;

  return (
    <Grid>
      <Form key={100} useStore={useStore} />
      {!isThereAnyNotes ? (
        <Grid gap={"16"} css={{ margin: "0 16px" }}>
          <Section dragable={true} notes={pinnedNotes} header="Pinned" />
          <Section
            pinnedNotes={false}
            dragable={true}
            notes={notes}
            header={pinnedNotes.length !== 0 ? "Others" : undefined}
          />
        </Grid>
      ) : (
        <NoNotes SVG={BiNotepad} children={"No Existing Notes"} />
      )}
    </Grid>
  );
};

export default ExistinNotesSection;
