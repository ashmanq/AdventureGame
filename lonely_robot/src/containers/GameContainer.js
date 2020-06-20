import React, { Component } from 'react';
import GameComponent from '../components/GameComponent.js';
import InventoryList from '../components/InventoryList.js';

class GameContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inventory: [{name: "sword"}, {name: "hammer"}, {name: "cheese"}],
    }
  };

  // removeInventory(itemName) {
  //   const found = this.state.inventory.filter((item) => {
  //     return item.name === itemName;
  //   })
  //
  //   if(found) {
  //     const array = [...this.state.inventory];
  //     const index = this.state.inventory.indexOf(found);
  //   }
  // }

  render() {
    return(
      <div className="game-container">
        <h1>The Lonely Robot</h1>
        <GameComponent />
        <InventoryList inventory={this.state.inventory}/>
      </div>

    )
  }


}

export default GameContainer;
