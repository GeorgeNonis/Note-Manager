import { StyledComponentProps } from "../../Atoms/Button/button.props";
import { StyledModal } from "./modal.styles";

export type StyledModalProps = StyledComponentProps<typeof StyledModal>;

export interface ModalProps extends StyledModalProps {
  children: React.ReactNode;
  open: boolean;
  title: string;
  fullScreen?: boolean;
  innerModal?: boolean;
  onClose: () => void;
}
