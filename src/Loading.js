import React, { useState, useEffect, useContext } from "react";
//import StyleContext from "../StyleContext";

import "./Loading.css";

const Loading = () => {

    //const { Styles } = useContext(StyleContext);

    return (
        <div className="Loading">
            <div className="Loading-gif">
                <img src="/pics/loading.gif"/>
            </div>
            <p>Loading...</p>
        </div>
    )
}

export default Loading;