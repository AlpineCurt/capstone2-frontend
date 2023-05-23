import './App.css';
import React, { useState } from 'react';
import Routes from './Routes';
import CurrUserContext from './CurrUserContext';

function App() {

  const [currUser, setCurrUser] = useState(null);

  return (
    <div className="App">
      <CurrUserContext.Provider value={{currUser, setCurrUser}}>
        <Routes />
      </CurrUserContext.Provider>
    </div>
  );
}

export default App;
