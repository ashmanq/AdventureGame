import Phaser from 'phaser';

class Room1 extends Phaser.Scene {


  constructor(props){
    super("Room1");

  }

  init(data) {
    this.data = data;
    // To position player depending on which room they've came from
    this.startPosX = 50;
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

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "r1_background");
    this.background.setOrigin(0, 0);

    // Create Robot sprite
    this.robot = this.add.sprite(this.startPosX, 420, "robotIdle");
    this.robot.setScale(2);
    this.physics.world.enable([ this.robot ]);
    this.robot.body.setCollideWorldBounds(true);

    if(this.data.returning) {
      this.robot.setFlip(true, false);
    }

    // Create Door sprite
    this.exitDoor = this.add.image(config.width - 10 , 366, "door");
    this.physics.world.enable([ this.exitDoor ]);

    this.physics.add.overlap(this.robot,   this.exitDoor,     function() {
          this.scene.start("Room2");
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
