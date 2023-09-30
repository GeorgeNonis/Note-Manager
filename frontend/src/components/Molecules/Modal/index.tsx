import { Text } from "../../Atoms";
import { ModalProps } from "./modal.props";
import { StyledBackdrop, StyledModal, StyledXmark } from "./modal.styles";

const Modal = ({
  fullScreen = false,
  children,
  open,
  onClose,
  innerModal = false,
  title,
  ...props
}: ModalProps) => {
  return (
    <StyledBackdrop onClick={onClose} isOpen={open} innerModal={innerModal}>
      <StyledModal
        innerModal={innerModal}
        onClick={(e) => e.stopPropagation()}
        {...props}
        fullscreen={fullScreen}
      >
        <Text center={true} css={{ w: "100%", display: "block" }} size={"l"}>
          {title}
        </Text>
        <StyledXmark onClick={onClose} />
        {children}
      </StyledModal>
    </StyledBackdrop>
  );
};
export default Modal;
