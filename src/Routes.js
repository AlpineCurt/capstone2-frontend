import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import Game from "./Game";
import HighScores from "./HighScores/HighScores";

const Routes = () => {
    return (
        <>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/highscores">
                <HighScores />
            </Route>
            <PrivateRoute exact path="/games/:gameId">
                <Game />
            </PrivateRoute>
        </Switch>
        </>
    );
}

export default Routes;