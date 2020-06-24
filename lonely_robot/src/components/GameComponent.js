import React, { Component } from 'react';
import Game from '../game/game.js';

class GameComponent extends Component {

  // constructor(props) {
  //   super(props)
  // }

  // Load game when mounted
  componentDidMount() {
    this.game = new Game(this, this.props)
  }

  render() {
    return(
        <div id="game"></div>
    )
  }


}

export default GameComponent;
