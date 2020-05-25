import React, { useState } from 'react';
import './styles.css';
import useGlobal from '../../state/store';

const TabItem = ({ tab }) => {    
    return (
        <div className='tab-item'>
            {tab.tabName}
        </div>
    );
}

export default TabItem