import React, { useState } from 'react';
import './styles.css';
import useGlobal from '../../state/store';
import InputComponent from '../InputComponent';
import ButtonComponent from '../ButtonComponent';

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
    handleFilter('filter'),
    'Pesquise por nome',
    'text'
  );

  const onSubmit = (event) => {
    event.preventDefault();
    globalActions.dashboard.filter();
}

  return (
    <div className='table'>
      <div>
          <form className='search-filter' onSubmit={onSubmit}>
        <InputComponent state={filterInput} />
        <ButtonComponent preventDefault type="submit" text={"Pesquise"} isLoading={globalState.dashboard.status === 'LOADING'}/>
        </form>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Nome</th>
            <th>Login</th>
            <th>Perfil</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Operadores;
