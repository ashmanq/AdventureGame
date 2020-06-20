import Phaser from 'phaser';

class LoadingScene extends Phaser.Scene {
  constructor() {
    super("loadingGame");
  }

  preload(){
    this.load.image("r1_background", "/assets/images/room1.png");
    this.load.image("r2_background", "/assets/images/room2.png");
    this.load.image("r3_background", "/assets/images/room3.png");
    this.load.image("oldLady", "/assets/images/oldLady.png");
    this.load.image("oldLady2", "/assets/images/oldLady2.png");
    this.load.image("oldLady3", "/assets/images/oldLady3.png");

    this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');

    this.load.image("door", "/assets/images/door.png");

    // spritesheets is a collection of single file separated by frames
    // this.load.spritesheet("robotRun", "/assets/spritesheets/robotRun.png",{
    //   //size of the frames
    //   frameWidth: 42,
    //   frameHeight: 36
    // });

    this.load.spritesheet("robotRun", "/assets/spritesheets/robotRun2.png",{
      //size of the frames
      frameWidth: 100,
      frameHeight: 100
    });

    // this.load.spritesheet("robotIdle", "/assets/spritesheets/robotIdle.png",{
    //   //size of the frames
    //   frameWidth: 29,
    //   frameHeight: 35
    // });

    this.load.spritesheet("robotIdle", "/assets/spritesheets/robot1.png",{
      //size of the frames
      frameWidth: 100,
      frameHeight: 100
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

  this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  setTimeout(() => {
    this.add.text(20, 200, "Please press enter to start!");
  }, 1000);


  }

  update(time, delta) {
    if(this.enterKey.isDown) {
      this.scene.start("room1");
    };
  }

}


// init() prepare data
// preload() load the music and the images in the memory
// create() add objects to the Game
// update() loop that runs constantly
export default LoadingScene;
