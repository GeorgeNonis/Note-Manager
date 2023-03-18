import { render, screen } from "@testing-library/react";
import * as reactRedux from "react-redux";
import ExistingNote from "../src/components/notes/existing-note";

const props = {
  note: {
    note: "",
    id: "",
    title: "string",
    color: "string",
    checkbox: true,
    createCheckboxes: true,
    checked: [{ id: "", note: "" }]!,
    unChecked: [{ id: "", note: "" }]!,
    labels: [""],
  },
  zindex: 10,
  position: 10,
  pinned: true,
  dragable: true,
  onDragEnd() {},
  onDragEnter(e: React.DragEvent, position: number) {},
  onDragStart(
    e: React.DragEvent,
    position: number,
    pinned: boolean,
    id: string
  ) {},
};

test(`Render's Note's sucessfully`, async () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
  // useDispatchMock.jest
  useDispatchMock.mockReturnValue((state) => {
    return state;
  });
  render(
    <ExistingNote
      note={props.note}
      onDragEnd={props.onDragEnd}
      onDragEnter={props.onDragEnter}
      onDragStart={props.onDragStart}
      position={0}
      zindex={100}
      dragable={true}
      key={10}
      pinned={true}
    />
  );

  const DivElement = screen.getAllByRole("div");
  expect(DivElement).not.toHaveLength(0);
});
