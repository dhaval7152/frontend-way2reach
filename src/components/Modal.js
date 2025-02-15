import React from "react";
import ReactModal from "react-modal";

const Modal = ({ children, onClose }) => {
  return (
    <ReactModal
      isOpen
      onRequestClose={onClose}
      className="modal-dialog"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content p-4">
        {children}
        {/* <button className="btn btn-secondary mt-3" onClick={onClose}>
          Close
        </button> */}
      </div>
    </ReactModal>
  );
};

export default Modal;
