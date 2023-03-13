import { NoteObj } from "../interfaces/interfaces";
import { Labels } from "../services/interfaces";

export interface InitialState {
  notes: NoteObj[];
  pinnedNotes: NoteObj[];
  deletedNotes: NoteObj[];
  labels: Labels[];
  // error: "";
}

export interface DisplayStateInitialState {
  error: string;
  review: boolean;
  loadingInitialState: boolean;
  httpReqResLoading: boolean;
}
