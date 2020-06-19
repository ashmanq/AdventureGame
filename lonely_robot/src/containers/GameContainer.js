import React, { Component } from 'react';
import Game from '../game/game.js';

class GameContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    this.game = new Game(this)
  }
  render() {

    return(
      <div id="game"></div>
    )
  }


}

export default GameContainer;
