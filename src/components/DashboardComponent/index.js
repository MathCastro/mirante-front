import React, { useState } from 'react';
import './styles.css';
import useGlobal from '../../state/store';
import Operadores from './Operadores';
import Pessoas from './Pessoas';

const DashboardComponent = () => {    
    const [globalState, globalActions] = useGlobal();
    const chooseTab = () => {
        var tab = globalState.dashboard.currentTab;
        var component;
        switch (tab.tabName) {
            case 'Operadores':
                component = <Operadores />
                break;
            case 'Pessoas':
                component = <Pessoas />
                   break;
            default:
                break;
        }
        return component;
    }
    
    return (
        <div className='dashboard'>
            {chooseTab()}
        </div>
    );
}

export default DashboardComponent