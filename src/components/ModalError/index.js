import React, { useState } from "react";
import Modal from "react-modal";
import useGlobal from "../../state/store";
import ButtonComponent from "../ButtonComponent";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalError = () => {
  const [globalState, globalActions] = useGlobal();

  function closeModal() {
    globalActions.dashboard.closeModal();
  }

  return (
    <Modal
      isOpen={globalState.dashboard.modalError}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h3>{globalState.dashboard.errorMessage}</h3>
      <ButtonComponent text={'Fechar'} isLoading={false} onClick={closeModal}/>
    </Modal>
  );
};

export default ModalError;