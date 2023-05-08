import { NoteObj } from "../interfaces/interfaces";
import { Labels } from "../services/interfaces";

export interface InitialState {
  email: string;
  // password: string;
  date: string;
  lastTimeDitedNote: string;
  image: string;
  notes: NoteObj[];
  pinnedNotes: NoteObj[];
  deletedNotes: NoteObj[];
  archivedNotes: NoteObj[];
  labels: Labels[];
}

export interface DisplayStateInitialState {
  error: string;
  review: boolean;
  loadingInitialState: boolean;
  httpReqResLoading: boolean;
  displaySideBar: boolean;
  isThereError: boolean;
  accountSettings: boolean;
  emailAlreadyInUse: boolean;
  showLoginForm: boolean;
}
