import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";

const Routes = () => {
    return (
        <>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/games/:gameId">
                <Game />
            </Route>
        </Switch>
        </>
    );
}

export default Routes;