import React, { useState, useEffect } from 'react';
import './styles.css';
import TabsComponent from '../../components/TabsComponent';
import { tabs } from './tabs';
import useGlobal from '../../state/store';

const Dashboard = () => {
    const [globalState, globalActions] = useGlobal();

    useEffect(() => {
        globalActions.dashboard.createTabs(tabs);
    }, []);

    return(
        <section className='dashboard-section'>
            <TabsComponent />
            
        </section>
    );
}

export default Dashboard;