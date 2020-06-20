import React, { Component } from 'react';
import Game from '../game/game.js';

class GameComponent extends Component {

  // Load game when mounted
  componentDidMount() {
    this.game = new Game(this)
  }

  render() {
    return(
        <div id="game"></div>
    )
  }


}

export default GameComponent;
