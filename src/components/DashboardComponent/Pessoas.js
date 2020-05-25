import React, { useState } from 'react';
import './styles.css';
import useGlobal from '../../state/store';
import InputComponent from '../InputComponent';
import ButtonComponent from '../ButtonComponent';

const Pessoas = () => {    
    const [globalState, globalActions] = useGlobal();

    return (
        <div className='table'>
            <div className='search-filter'>
                <InputComponent />
                <ButtonComponent />
            </div>
            <table>
                <tr>
                    <th>Nome</th>
                    <th>Login</th>
                    <th>Perfil</th>
                </tr>
            </table>
        </div>
    );
}

export default Pessoas