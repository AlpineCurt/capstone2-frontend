import './App.css';
import React, { useState } from 'react';
import Routes from './Routes';
import CurrUserContext from './CurrUserContext';
import StyleContext from './StyleContext';

function App() {

  const [currUser, setCurrUser] = useState(null);
  const Styles = {
    avatarSprites: "url(/pics/avatars_scaled.jpg)",
    luckiestGuy: "url(/fonts/LuckiestGuy-Regular.ttf)",
    avatarSpritesXPos: {0: 0, 1: 75, 2: 149, 3: 223, 4: 297,
      5: 371, 6: 445, 7: 519, 8: 593 },
    loadingGif: "url(/pics/loading.gif)"
    
  }

  return (
    <div className="App">
      <StyleContext.Provider value={{
        Styles
      }}>
        <CurrUserContext.Provider value={{currUser, setCurrUser}}>
          <Routes />
        </CurrUserContext.Provider>
      </StyleContext.Provider>
    </div>
  );
}

export default App;
