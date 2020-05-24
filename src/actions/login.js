import axios from "axios";

export const login = (store, request = axios) => {
    console.log(store.login);
}

export const handleInput = (store, value, field) => {
    console.log(store.state.login);
    const newLogin = { ...store.state.login }
    newLogin[field] = value;
    store.setState({ login: newLogin });
}