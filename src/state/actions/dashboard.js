export const createTabs = (store, tabs) => {
    const newDashboard = { ...store.state.dashboard };
    let tabsItens = [];
    for(let i = 0; i < tabs.length; i++) {
        if(tabs[i].role.includes(store.state.operator.user.roles.role)) {
            tabsItens.push(tabs[i])
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
}