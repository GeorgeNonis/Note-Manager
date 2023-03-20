import { render, screen } from "@testing-library/react";
import PinnedNotesSection from "./pinned-notes-section";

test(`Render's Note's sucessfully`, async () => {
  const notes = [
    {
      id: "123",
      note: "note",
      title: "string",
      color: "string",
      checkbox: true,
      createCheckboxes: true,
      checked: [{ id: "123", note: "note" }],
      unChecked: [{ id: "123", note: "note" }],
      labels: ["string"],
    },
  ];
  render(<PinnedNotesSection dragable={true} notes={notes} />);
  const DivWithNotes = screen.getByRole("divwithnotes");
  expect(DivWithNotes).not.toHaveLength(0);
});
