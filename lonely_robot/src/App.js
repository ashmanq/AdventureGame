import React from 'react';
import GameContainer from './containers/GameContainer.js';
import './App.css';

import {BrowserRouter as Router} from "react-router-dom";


function App() {
  return (
      <Router basename={process.env.PUBLIC_URL}>
        <GameContainer />
      </Router>

  );
}

export default App;
