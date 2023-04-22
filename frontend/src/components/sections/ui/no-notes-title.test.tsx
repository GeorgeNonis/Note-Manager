import { render, screen } from "@testing-library/react";

import NoNotesTitle from "./noNotesMsg";

const state = {
  notes: [],
  pinnedNotes: [],
  deletedNotes: [],
  labels: [],
};

test(`Render's App file sucessfully`, () => {
  render(<NoNotesTitle state={state} />);

  const ParagraphElement = screen.getByText("No notes", { exact: false });

  expect(ParagraphElement).toBeInTheDocument();
  expect(true).toBeTruthy();
});
