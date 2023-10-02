import { useEffect, forwardRef } from "react";
import { Text } from "../../Atoms";
import { ModalProps } from "./modal.props";
import { StyledBackdrop, StyledModal, StyledXmark } from "./modal.styles";

/**
 * Modal component used to display content in a pop-up overlay.
 *
 * @param fullScreen - Determines if the modal should take up the full viewport.
 * @param children - The content of the modal.
 * @param open - If true, the modal is open. If false, it's closed.
 * @param onClose - Function for closing the Modal.
 * @param innerModal - If the modal is an inner Modal of another one so it can be displayed and not hidden from parent Modal.
 * @param title - The title displayed at the top of the modal.
 * @param {React.Ref<HTMLDivElement>} ref - Ref forwarded for DOM access.
 * @param ...props - Remaining properties passed to the StyledModal.
 *
 * @example
 * <Modal open={true} onClose={handleClose}>Hello, I'm a modal</Modal>
 */
const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      fullScreen = false,
      children,
      open,
      onClose,
      innerModal = false,
      title,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (open) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    }, [open]);

    return (
      <StyledBackdrop onClick={onClose} isOpen={open} innerModal={innerModal}>
        <StyledModal
          innerModal={innerModal}
          onClick={(e) => e.stopPropagation()}
          {...props}
          fullscreen={fullScreen}
          ref={ref} // Attach the ref here
        >
          <Text center={true} css={{ w: "100%", display: "block" }} size={"l"}>
            {title}
          </Text>
          <StyledXmark onClick={onClose} />
          {children}
        </StyledModal>
      </StyledBackdrop>
    );
  }
);

export default Modal;
