import { InitialState } from "../../../../store/interfaces";

export interface AccountInfoProps {
  initialState: InitialState;
}

export interface InfoProps {
  name: string;
  type?: string;
  value: string;
}
