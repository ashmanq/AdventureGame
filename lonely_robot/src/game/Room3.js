import Phaser from 'phaser';
import Character from "./sprites/Character.js"
import Npc from  "./sprites/Npc.js"
import CreateSpeechBox from "./textbox/SpeechBox.js";

class Room3 extends Phaser.Scene {


  constructor(props){
    super("room3");

  }

  init(data) {
    this.data = data;
    // To position player depending on which room they've came from
    this.startPosX = 80;
    if(data.start_x_pos) {
      this.startPosX = data.start_x_pos;
    }

    console.log(this.startPosX);
  }

  create() {
    // Stop sprites from leaving boundary of scene
    this.physics.world.setBoundsCollision(true, true, true, true);
    const config = this.game.config;

    // Keyboard inputs
    this.keyboard = this.input.keyboard.addKeys("W, A, S, D, RIGHT, LEFT");

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "r3_background");
    this.background.setOrigin(0, 0);

    this.robot = new Character(this, this.startPosX, 390);
    this.npc = new Npc(this, 600, 390, 'key', 'oldLady3');

    // // Create Robot sprite
    // this.robot = this.add.sprite(this.startPosX, 390, "robotIdle");
    // this.robot.setScale(1.5);
    // this.physics.world.enable([ this.robot ]);
    // // Sets size of collision boundary
    // this.robot.body.setSize(70, 90);
    // this.robot.body.setCollideWorldBounds(true);

    // Create Door sprite
    this.leftSideDoor = this.add.image(10 , 366, "door");
    this.physics.world.enable([ this.leftSideDoor ]);

    this.rightSideDoor = this.add.image(config.width - 10 , 366, "door");
    this.physics.world.enable([ this.rightSideDoor ]);

    this.physics.add.overlap(this.robot,   this.leftSideDoor,     function() {
          // this.player.exiting = true;
          const data = {
            start_x_pos: 700,
            returning: true,
          }
          this.scene.start("room2", data);
      }, null, this);


    this.physics.add.overlap(this.robot,   this.rightSideDoor,     function() {
          this.scene.start("endScreen");
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
      frameRate: 3,
      repeat: -1 //infinite loop
    });

    this.add.text(20, 20, "Playing game", {
      font: "25px Arial",
      fill: "yellow"
    });

    // Speech Box
    this.speechBox = CreateSpeechBox(this, 130, 470, {
                 wrapWidth: config.width - 400,
                 fixedWidth: config.width - 400,
                 fixedHeight: 75,
               })

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

export default Room3;
