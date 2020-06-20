import React, { Component } from 'react';
import GameComponent from '../components/GameComponent.js';
import InventoryList from '../components/InventoryList.js';

class GameContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inventory: ["sword", "hammer", "cheese"],
    }
  };

  render() {
    return(
      <div className="game-container">
        <h1>The Lonely Robot</h1>
        <GameComponent />
        <InventoryList />
        <h2>Hi</h2>
      </div>

    )
  }


}

export default GameContainer;
