import Phaser from 'phaser';
import Scene1 from './Scene1.js';
import Scene2 from './Scene2.js';


class Game extends Phaser.Game {
  constructor(react) {
    const config = {
      width: 800,
      height: 600,
      backgroundColor: 0x000000,
      scene: [Scene1, Scene2],
      
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
