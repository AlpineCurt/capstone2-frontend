import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import Game from "./Game";

const Routes = () => {
    return (
        <>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <PrivateRoute exact path="/games/:gameId">
                <Game />
            </PrivateRoute>
        </Switch>
        </>
    );
}

export default Routes;