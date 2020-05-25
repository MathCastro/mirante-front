import React, { useState, useEffect } from "react";
import "./styles.css";
import useGlobal from "../../state/store";
import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";
import deleteButton from "../../assets/delete.svg";

const Operadores = () => {
  const [globalState, globalActions] = useGlobal();

  const createInputModel = (value, onChange, placeholder, type) => {
    return {
      value: value,
      onChange: onChange,
      placeholder: placeholder,
      type: type,
    };
  };

  const handleFilter = (name) => (event) => {
    let { value } = event.target;
    globalActions.dashboard.handleInput(value, name);
  };

  const filterInput = createInputModel(
    globalState.dashboard.filter,
    handleFilter("filter"),
    "Pesquise por nome",
    "text"
  );

  const onSubmit = (event) => {
    event.preventDefault();
    globalActions.dashboard.filter();
  };

  const createTable = () => {
    let table = [];
    if (globalState.dashboard.status === "SUCCESS") {
      for (let i = 0; i < globalState.dashboard.data.content.length; i++) {
        let children = [];
        children.push(<td>{globalState.dashboard.data.content[i].name}</td>);
        children.push(
          <td>{globalState.dashboard.data.content[i].user.username}</td>
        );
        children.push(
          <td>
            {globalState.dashboard.data.content[i].user.roles.role.slice(5)}
          </td>
        );
        children.push(
          <td
            onClick={async () => {
              await globalActions.dashboard.deleteItem(
                globalState.dashboard.data.content[i].id
              );
              globalActions.dashboard.filter();
            }}
          >
            <img className="delete-icon" src={deleteButton} alt="" />
          </td>
        );
        table.push(
          <tbody className="table-row">
            <tr>{children}</tr>
          </tbody>
        );
      }
    }
    return table;
  };

  useEffect(() => {
    globalActions.dashboard.filter();
  }, []);

  return (
    <div className="table">
      <div>
        <form className="search-filter" onSubmit={onSubmit}>
          <InputComponent state={filterInput} />
          <div>
            <ButtonComponent
              preventDefault
              type="submit"
              text={"Pesquisar"}
              isLoading={globalState.dashboard.status === "LOADING"}
            />
            <ButtonComponent
              preventDefault
              type="submit"
              text={"Criar"}
              isLoading={globalState.dashboard.status === "LOADING"}
            />
          </div>
        </form>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Nome</th>
            <th>Login</th>
            <th>Perfil</th>
            <th>Excluir</th>
          </tr>
        </tbody>
        {createTable()}
      </table>
    </div>
  );
};

export default Operadores;
