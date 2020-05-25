import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import useGlobal from "../../state/store";
import ButtonComponent from "../ButtonComponent";
import InputComponent from "../InputComponent";

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

Modal.setAppElement("body");

const ModalOperator = () => {
  const [globalState, globalActions] = useGlobal();
  const title = globalState.dashboard.idOperator === null ? "Criar" : "Editar";

  function closeModal() {
    globalActions.dashboard.closeModalOperator(false);
  }

  const onSubmit = () => {
    globalActions.dashboard.finishOperator();
  };

  const handleInput = (name) => (event) => {
      debugger;
    let { value } = event.target;
    globalActions.dashboard.handleOperatorInput(value, name);
  };

  const createInputModel = (value, onChange, placeholder, type) => {
    return {
      value: value,
      onChange: onChange,
      placeholder: placeholder,
      type: type,
    };
  };

  const nameInput = createInputModel(
    globalState.operatorInfo.name,
    handleInput("name"),
    "Nome",
    "text"
  );
  const usernameInput = createInputModel(
    globalState.operatorInfo.user.username,
    handleInput("username"),
    "Usuário",
    "text"
  );
  const passwordInput = createInputModel(
    globalState.operatorInfo.user.password,
    handleInput("password"),
    "Senha",
    "password"
  );

  useEffect(() => {
    if (globalState.dashboard.idOperator !== null) {
      globalActions.dashboard.findById();
    }
  }, [globalState.dashboard.idOperator]);

  return (
    <Modal
      isOpen={globalState.dashboard.modalOperator}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h3>{`${title} Operador`}</h3>
      <form onSubmit={onSubmit}>
        <InputComponent state={nameInput}></InputComponent>
        <InputComponent state={usernameInput}></InputComponent>
        {globalState.dashboard.idOperator === null && (
          <InputComponent state={passwordInput}></InputComponent>
        )}
        <select name="cargo" onChange={() => {handleInput("roles")}}>
          <option value="2">GERENTE</option>
          <option value="3">ANALISTA</option>
        </select>
      </form>

      <div>
        <ButtonComponent text={title} isLoading={false} onClick={onSubmit} />
        <ButtonComponent
          text={"Fechar"}
          isLoading={false}
          onClick={closeModal}
        />
      </div>
    </Modal>
  );
};

export default ModalOperator;
