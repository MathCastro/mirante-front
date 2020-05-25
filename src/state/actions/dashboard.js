import axios from "axios";

const BASE_URL = "http://localhost:8080";

const getInstance = (store) => {
  return axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: { Authorization: `Bearer ${store.state.token}` },
  });
};

export const handleInput = (store, value, field) => {
  const newDashboard = { ...store.state.dashboard };
  newDashboard[field] = value;
  store.setState({ dashboard: newDashboard });
};

export const createTabs = (store, tabs) => {
  const newDashboard = { ...store.state.dashboard };
  let tabsItens = [];
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].role.includes(store.state.operator.user.roles.role)) {
      tabsItens.push(tabs[i]);
    }
  }
  newDashboard.tabs = tabsItens;
  newDashboard.currentTab = tabsItens[0];
  store.setState({ dashboard: newDashboard });
};

export const selectTab = (store, tab) => {
  const newDashboard = { ...store.state.dashboard };
  newDashboard.currentTab = tab;
  store.setState({ dashboard: newDashboard });
};

export const filter = async (store, request = getInstance(store)) => {
  const state = { ...store.state.dashboard };
  state.status = "LOADING";
  store.setState({ dashboard: state });

  const params = {
    pageNo: state.pageNo,
    pageSize: state.pageSize,
    sortBy: state.sortBy,
    value: state.filter,
  };
  try {
    const response = await request.get(state.currentTab.url, { params });

    state.data = response.data;
    state.status = "SUCCESS";
    store.setState({ dashboard: state });
  } catch (error) {
    state.status = "ERROR";
    store.setState({ dashboard: state });
    console.error(error);
  }
};

export const findById = async (store, request = getInstance(store)) => {
  const state = { ...store.state.dashboard };
  state.status = "LOADING";
  store.setState({ dashboard: state });
  try {
    const response = await request.get(
      `${state.currentTab.url}/${state.idOperator}`
    );
    state.status = "SUCCESS";
    store.setState({ dashboard: state, operatorInfo: response.data });
  } catch (error) {
    state.status = "ERROR";
    state.modalError = true;
    state.errorMessage =
      "Erro ao buscar operador.";
    store.setState({ dashboard: state });
    console.error(error);
  }
};

export const createOperator = async (store, request = getInstance(store)) => {
  const state = { ...store.state.dashboard };
  let operator = { ...store.state.operatorInfo };
  state.status = "LOADING";
  store.setState({ dashboard: state });

  try {
    const response = await request.post(state.currentTab.url, { ...operator });

    operator = {
      id: null,
          name: '',
          user: {
              username: '',
              password: '',
          },
    };

    state.status = "SUCCESS";
    state.modalOperator = false;
    store.setState({ dashboard: state, operatorInfo: operator });
  } catch (error) {
    state.status = "ERROR";
    store.setState({ dashboard: state });
    console.error(error);
  }
};

export const deleteItem = async (store, id, request = getInstance(store)) => {
  const state = { ...store.state.dashboard };
  state.status = "LOADING";
  store.setState({ dashboard: state });
  try {
    const response = await request.delete(`${state.currentTab.url}/${id}`);

    state.status = "SUCCESS";
    store.setState({ dashboard: state });
  } catch (error) {
    state.status = "ERROR";
    state.modalError = true;
    state.errorMessage =
      "Não foi possível deletar Operador. Verifique se ele não possui dependências.";
    store.setState({ dashboard: state });
    console.error(error);
  }
};

export const closeModal = (store) => {
  const state = { ...store.state.dashboard };
  state.modalError = false;
  store.setState({ dashboard: state });
};

export const closeModalOperator = (store) => {
  const newOperator = {
    id: null,
        name: '',
        user: {
            username: '',
            password: '',
        },
  };
  const state = { ...store.state.dashboard };
  state.modalOperator = false;
  store.setState({ dashboard: state, operatorInfo: newOperator });
};

export const openModalOperator = (store, id) => {
  const state = { ...store.state.dashboard };
  state.modalOperator = true;
  state.idOperator = id;
  store.setState({ dashboard: state });
};

export const finishOperator = (store) => {
  const state = { ...store.state.dashboard };
  const operator = { ...store.state.operatorInfo };

  if(state.idOperator === null) {
    createOperator(store);
  }
}

export const handleOperatorInput = (store, value, field) => {
  const newOperator = { ...store.state.operatorInfo };
  switch (field) {
    case "name":
      newOperator[field] = value;
      break;
    case "username":
      newOperator.user[field] = value;
      break;
    case "password":
      newOperator.user[field] = value;
      break;
    case "roles":
        newOperator.user.roles.id = value;
        break;
    default:
      break;
  }
  store.setState({ operatorInfo: newOperator });
};
