import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const RModal = ({
  modalRef,
  wrapClassName = "modal-right",
  size = "lg",
  title = "Title",
  backdrop = "static",
  footer,
  showHeader = true,
  style,
  onCloseAction,
  ...props
}) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Modal
        isOpen={modal}
        toggle={() => {
          setModal(!modal);
        }}
        wrapClassName={wrapClassName}
        size={size}
        ref={modalRef}
        backdrop={backdrop}
        style={style}
      >
        {showHeader && (
          <ModalHeader
            toggle={() => {
              setModal(!modal);
              if (onCloseAction && modal) {
                onCloseAction();
              }
            }}
          >
            {title}
          </ModalHeader>
        )}
        <ModalBody>{props.children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </Modal>
    </>
  );
};

export default RModal;
