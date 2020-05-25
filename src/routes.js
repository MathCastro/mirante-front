import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import useGlobal from "./state/store";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/home">
            <Dashboard></Dashboard>
        </PrivateRoute>
        <Route path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

function PrivateRoute({ children, ...rest }) {
  const [globalState, globalActions] = useGlobal();
  const isAuthenticated = globalActions.login.isAuthenticated();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
