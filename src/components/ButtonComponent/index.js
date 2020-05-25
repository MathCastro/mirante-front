import React, { useState } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';


const ButtonComponent = ({ text, isLoading, onClick }) => {
    const content = isLoading ? <ReactLoading type={'spin'} color={'#dddddd'} height={25} width={25} /> : text;

    return (
        <button className="button" onClick={onClick}>{content}</button>
    );
}

ButtonComponent.propTypes = {
    text: PropTypes.string.isRequired,
}

export default ButtonComponent