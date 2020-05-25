import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.css';
import image from '../../assets/undraw_businessman_97x4.svg'
import ButtonComponent from '../../components/ButtonComponent';
import useGlobal from '../../state/store';
import InputComponent from '../../components/InputComponent';

const Login = ({ history }) => {
    const [globalState, globalActions] = useGlobal();

    const handleInput = (name) => (event) => {
        let { value } = event.target;
        globalActions.login.handleInput(value, name)
    }

    const createInputModel = (value, onChange, placeholder, type) => {
        return {
            'value': value,
            'onChange': onChange,
            'placeholder': placeholder,
            'type': type,
        }
    }

    const usernameInput = createInputModel(globalState.login.username, handleInput('username'), 'Usuário', 'text');
    const passwordInput = createInputModel(globalState.login.password, handleInput('password'), 'Senha', 'password');

    const onSubmit = (event) => {
        event.preventDefault();
        globalActions.login.login();
    }

    useEffect(() => {
        if(globalState.login.status === 'SUCCESS'){
            history.push('/home');
            globalActions.login.loginSucced();
        }
    }, [globalState.login.status]);

    return(
        <section className="login-section">
            <div className="card">
                <div className="login">
                    <h1>
                        Login
                    </h1>
                    <form onSubmit={onSubmit}>
                        <InputComponent state={usernameInput}></InputComponent>
                        <InputComponent state={passwordInput}></InputComponent>
                        <ButtonComponent preventDefault type="submit" text={"Enviar"} isLoading={globalState.login.status === 'LOADING'}/>
                    </form>
                    
                </div>
                <div className="image">
                    <img src={image}></img>
                </div>
            </div>
        </section>
    );
};

export default withRouter(Login);