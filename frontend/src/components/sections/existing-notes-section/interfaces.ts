import { Dispatch, SetStateAction } from "react";
import { InitialState } from "../../../store/interfaces";

export interface Store {
  values: {
    error: string;
    loading: boolean;
    display: boolean;
    note: string;
    title: string;
    clickOutsideNote: React.MutableRefObject<any>;
    state: InitialState;
  };
  actions: {
    setDisplay: Dispatch<SetStateAction<boolean>>;
    onDragEnd: () => Promise<void>;
    onDragEnter: (e: React.DragEvent<Element>, position: number) => void;
    onDragStart: (
      e: React.DragEvent<Element>,
      position: number,
      pinned: boolean,
      id: string
    ) => void;
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeNote: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}
