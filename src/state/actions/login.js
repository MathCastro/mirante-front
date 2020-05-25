import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const login = async (store, request = axios) => {
  const state = { ...store.state.login };
  state.status = 'LOADING';
  store.setState({ login: state });
  try {
    const response = await request.post(BASE_URL + '/authenticate', {
      username: state.username,
      password: state.password,
    });
    const operator = response.data.operator;
    const token = response.data.token;
    const expireAt = response.data.expireAt;

    state.status = 'SUCCESS';
    state.username = '';
    state.password = '';
    store.setState({ login: state, operator, token, expireAt });
  } catch (error) {
    console.error(error);
  }
};

export const handleInput = (store, value, field) => {
    const newLogin = { ...store.state.login };
    newLogin[field] = value;
    store.setState({ login: newLogin });
};

export const loginSucced = (store) => {
    const state = { ...store.state.login };
    state.status = 'INITIAL';
    store.setState({ login: state });
}

export const isAuthenticated = (store) => {
    const state = { ...store.state };
    var now = new Date();
    return (!(state.token === '' || state.expireAt === '' || state.expireAt < now));
}