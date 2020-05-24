import React, { useState } from 'react';
import './styles.css';

const InputComponent = ({ state }) => {
    return (
        <input placeholder={state.placeholder} className='input' type={state.type} value={state.value} onChange={state.onChange}></input>
    );
}

export default InputComponent