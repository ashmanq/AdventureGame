import Phaser from 'phaser';
import LoadingScene from './LoadingScene.js';
import Room1 from './Room1.js';
import Room2 from './Room2.js';
import Room3 from './Room3.js';
import EndScreen from './EndScreen.js';


class Game extends Phaser.Game {
  constructor(react) {
    const config = {
      title: "The Lonely Robot",
      version: 'v0.1',
      autoFocus: true,

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
            debug: true
        }
      }
    }

    super(config);
    this.react = react;
  }
}


export default Game;
