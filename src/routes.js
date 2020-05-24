import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import login from './pages/login';
import dashboard from './pages/dashboard';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/home' component={dashboard}/>
                <Route path='/' component={login}/>
            </Switch>
        </BrowserRouter>
    );
}