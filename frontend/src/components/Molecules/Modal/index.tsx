import { ModalProps } from "./modal.props";
import { StyledBackdrop, StyledModal, StyledXmark } from "./modal.styles";

const Modal = ({
  fullScreen = false,
  children,
  open,
  onClose,
  ...props
}: ModalProps) => {
  return (
    <StyledBackdrop onClick={onClose} isOpen={open}>
      <StyledModal
        onClick={(e) => e.stopPropagation()}
        {...props}
        fullscreen={fullScreen}
      >
        <StyledXmark onClick={onClose} />
        {children}
      </StyledModal>
    </StyledBackdrop>
  );
};
export default Modal;
