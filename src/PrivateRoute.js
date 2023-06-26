import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import CurrUserContext from "./CurrUserContext";

const PrivateRoute = ({exact, path, children}) => {
    const { currUser } = useContext(CurrUserContext);
    
    if (!currUser) {
        return <Redirect to="/" />;
    }

    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
}

export default PrivateRoute;