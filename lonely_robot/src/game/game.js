import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import LoadingScene from './scenes/LoadingScene.js';
import Room1 from './scenes/Room1.js';
import Room2 from './scenes/Room2.js';
import Room3 from './scenes/Room3.js';
import EndScreen from './scenes/EndScreen.js';


class Game extends Phaser.Game {
  constructor(react, props) {

    const config = {
      title: "The Lonely Robot",
      version: '0.1',
      autoFocus: true,
      parent: 'game',

      width: 800,
      height: 600,
      backgroundColor: 0x000000,
      scene: [LoadingScene, Room1, Room2, Room3, EndScreen],

      render: {
        pixelArt: true
      },

      physics: {
      default: "arcade",
        arcade: {
            debug: false
        }
      },
      plugins: {
        scene: [
          {
            key: 'rexUI',
            plugin: RexUIPlugin,
            mapping: 'rexUI'
          },
        ]
      }
    }

    super(config);
    this.react = react;
    this.registry.set('gameData', { room1Complete: false, room2Complete: false, room3Complete:false});
    this.registry.set("inventory", []);
    console.log(this.registry.get("inventory"));
    this.updateInventory = props.updateInventory;
    props.updateInventory(this.inventory);




  }
}


export default Game;
