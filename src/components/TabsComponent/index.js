import React, { useState } from 'react';
import './styles.css';
import useGlobal from '../../state/store';
import TabItem from './TabItem';

const TabsComponent = () => {
    const [globalState, globalActions] = useGlobal();

    const createTabs = () => {
        let tabsItens = [];
        for(let i = 0; i < globalState.dashboard.tabs.length; i++) {
            tabsItens.push(<TabItem tab={globalState.dashboard.tabs[i]}/>)
        }

        return tabsItens;
    }

    return (
        <div className='tabs'>
            {createTabs()}
        </div>
    );
}

export default TabsComponent