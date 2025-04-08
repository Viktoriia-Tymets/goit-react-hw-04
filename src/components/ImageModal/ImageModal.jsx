import React from "react";
import Modal from "react-modal";
import css from "./ImageModal.module.css";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    padding: 0,
    margin: 0,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function ImageModal({ image, onCloseModal }) {
  const closeModal = () => {
    onCloseModal(null);
  };

  return (
    <Modal isOpen={!!image} onRequestClose={closeModal} style={modalStyles}>
      {image && <img src={image} alt="modal" className={css.images} />}
    </Modal>
  );
}
