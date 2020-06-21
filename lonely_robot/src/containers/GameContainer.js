import React, { Component } from 'react';
import GameComponent from '../components/GameComponent.js';
import InventoryList from '../components/InventoryList.js';

class GameContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inventory: [{name: "sword"}, {name: "hammer"}, {name: "cheese"}],
    }

    this.updateInventory = this.updateInventory.bind(this);
  };

  updateInventory(inventory) {
    this.setState({inventory: inventory})
    console.log(inventory);
  //
  //   if(found) {
  //     const array = [...this.state.inventory];
  //     const index = this.state.inventory.indexOf(found);
  //   }
  }

  render() {
    return(
      <div className="game-container">
        <h1>The Lonely Robot</h1>
        <GameComponent updateInventory={this.updateInventory}/>
        <InventoryList inventory={this.state.inventory}/>
      </div>

    )
  }


}

export default GameContainer;
