import { StyledComponentProps } from "../../Atoms/Button/button.props";
import { StyledModal } from "./modal.styles";

export type StyledModalProps = StyledComponentProps<typeof StyledModal>;

export interface ModalProps extends StyledModalProps {
  /** The content of the modal. */
  children: React.ReactNode;

  /** Determines if the modal is open (`true`) or closed (`false`). */
  open: boolean;

  /** The title displayed at the top of the modal. */
  title: string;

  /**
   * Optional. Determines if the modal should take up the full viewport.
   * Defaults to `false` if not provided.
   */
  fullScreen?: boolean;

  /**
   * If the modal is an inner Modal of another one so it can be displayed and not hidden from parent Modal.
   * If set to `true`, adjusts for inner modal.
   * Defaults to `false` if not provided.
   */
  innerModal?: boolean;

  /** Function for closing the Modal. */
  onClose: () => void;
}
