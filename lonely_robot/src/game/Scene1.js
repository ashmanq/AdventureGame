import Phaser from 'phaser';

class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("background", "/assets/images/scene1.png");

    // spritesheets is a collection of single file separated by frames

    this.load.spritesheet("robotRun", "/assets/spritesheets/robotRun.png",{
      //size of the frames
      frameWidth: 42,
      frameHeight: 36
    });

    this.load.spritesheet("robotIdle", "/assets/spritesheets/robotIdle.png",{
      //size of the frames
      frameWidth: 29,
      frameHeight: 35
    });

    this.load.spritesheet("ship", "/assets/spritesheets/ship.png",{
      //size of the frames
      frameWidth: 16,
      frameHeight: 16
    });


    this.load.spritesheet("ship2", "/assets/spritesheets/ship2.png",{
      //size of the frames
      frameWidth: 32,
      frameHeight: 16
    });

    this.load.spritesheet("ship3", "/assets/spritesheets/ship3.png",{
      //size of the frames
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("explosion", "/assets/spritesheets/explosion.png",{
      //size of the frames
      frameWidth: 16,
      frameHeight: 16
    });

}
  create() {
  this.add.text(20, 20, "..based on a true story...");
  this.add.text(20, 50, "..created by Francesco Dama and Ashir Qureshi..");
  this.add.text(20, 80,"..or Ashir Dama and Francesco Qureshi ??");
  this.add.text(20, 110,"... machines are not perfect..");
  this.add.text(20, 160, "Loading game..can take a while due the huge amount of data...");

  this.scene.start("playGame");

  }

}


// init() prepare data
// preload() load the music and the images in the memory
// create() add objects to the Game
// update() loop that runs constantly
export default Scene1;
