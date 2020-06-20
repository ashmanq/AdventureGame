import Phaser from 'phaser';
import Character from "./sprites/Character.js"
import Npc from  "./sprites/Npc.js"
import CreateSpeechBox from "./textbox/SpeechBox.js";
class Room1 extends Phaser.Scene {


  constructor(props){
    super("room1");

  }

  init(data) {
    this.data = data;
    // To position player depending on which room they've came from
    this.startPosX = 50;
    if(data.start_x_pos) {
      this.startPosX = data.start_x_pos;
    }

  }


  create() {
    // Stop sprites from leaving boundary of scene
    this.physics.world.setBoundsCollision(true, true, true, true);
    const config = this.game.config;

    // Keyboard inputs
    this.keyboard = this.input.keyboard.addKeys("W, A, S, D, RIGHT, LEFT");

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "r1_background");
    this.background.setOrigin(0, 0);

    // Create Robot sprite
    this.robot = new Character(this, this.startPosX, 390);
    // Create NPC sprite
    this.npc = new Npc(this, 600, 390, 'microchip', 'oldLady');


    if(this.data.returning) {
      this.robot.setFlip(true, false);
    }

    // Create Door sprite
    this.exitDoor = this.add.image(config.width - 10 , 366, "door");
    this.physics.world.enable([ this.exitDoor ]);

    this.physics.add.overlap(this.robot, this.exitDoor, function() {
          this.scene.start("room2");
      }, null, this);

    //create animation
    this.anims.create({
      key: "robot_run", //id
      frames: this.anims.generateFrameNumbers("robotRun"),
      frameRate: 10,
      repeat: 0 //infinite loop
    });

    this.anims.create({
      key: "robot_idle", //id
      frames: this.anims.generateFrameNumbers("robotIdle"),
      frameRate: 7,
      repeat: -1 //infinite loop
    });

    this.add.text(20, 20, "Playing game", {
      font: "25px Arial",
      fill: "yellow"
    });

    this.text = "I am a speech text! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    // const speechText = this.add.text(20, 20, this.text, {
    //   font: "25px Arial",
    //   fill: "white",
    //   wordWrap: { width: config.width - 20 }
    // });

   this.speechBox = CreateSpeechBox(this, 130, 470, {
                wrapWidth: config.width - 400,
                fixedWidth: config.width - 400,
                fixedHeight: 75,
            }).start(this.text, 60)
    }


    update(time, delta) {

      this.physics.world.collide(this.robot);


      if(!this.keyboard.D.isDown && !this.keyboard.RIGHT.isDown === true
        && !this.keyboard.LEFT.isDown && !this.keyboard.A.isDown) {
        this.robot.body.setVelocity(0,0);
        this.robot.play("robot_idle", true);
      }

      if(this.keyboard.D.isDown === true || this.keyboard.RIGHT.isDown === true) {
        this.robot.setFlip(false, false);
        this.robot.body.setVelocity(160, 0)
        this.robot.play("robot_run", true);
      }

      if(this.keyboard.A.isDown === true || this.keyboard.LEFT.isDown === true) {
        this.robot.setFlip(true, false);
        this.robot.body.setVelocity(-160, 0)
        this.robot.play("robot_run", true);
      }



    }


}

export default Room1;
