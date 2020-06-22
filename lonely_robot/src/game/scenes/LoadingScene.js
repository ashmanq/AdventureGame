import Phaser from 'phaser';

class LoadingScene extends Phaser.Scene {
  constructor() {
    super("loadingGame");
  }

  preload(){
    // Load music
    this.load.audio('main', '/assets/music/mainTheme.mp3');

    // Load background images
    this.load.image("r1_background", "/assets/images/backgrounds/room1.png");
    this.load.image("r2_background", "/assets/images/backgrounds/room2.png");
    this.load.image("r3_background", "/assets/images/backgrounds/room3.png");

    // Load NPC images
    this.load.image("oldLady", "/assets/images/characters/oldLady.png");
    this.load.image("oldLady2", "/assets/images/characters/oldLady2.png");
    this.load.image("oldLady3", "/assets/images/characters/oldLady3.png");

    // Load item images
    this.load.image("microchip", "assets/images/items/microchip.png");
    this.load.image("battery", "assets/images/items/battery.png");
    this.load.image("bread", "assets/images/items/bread.png");
    this.load.image("cheese", "assets/images/items/cheese.png");
    this.load.image("drawing", "assets/images/items/drawing.png");
    this.load.image("keycard", "assets/images/items/keycard.png");

    // Door image for entry/exit doors
    this.load.image("door", "/assets/images/door.png");

    // Used for speech box
    this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');


    this.load.spritesheet("robotRun", "/assets/spritesheets/robotv3Run.png",{
      //size of the frames
      frameWidth: 64,
      frameHeight: 64
    });


    this.load.spritesheet("robotIdle", "/assets/spritesheets/robotv3Idle.png",{
      //size of the frames
      frameWidth: 64,
      frameHeight: 64
    });

}
  create() {
  this.game.music = this.sound.add('main');
  this.game.music.loop = true;
  // this.game.music.play();

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
