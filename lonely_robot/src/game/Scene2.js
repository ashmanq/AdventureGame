import Phaser from 'phaser';

class Scene2 extends Phaser.Scene {


  constructor(props){
    super("playGame");

  }

  create() {
    // Stop sprites from leaving boundary of scene
    this.physics.world.setBoundsCollision(true, true, true, true);
    const config = this.game.config;

    // Keyboard inputs
    this.keyboard = this.input.keyboard.addKeys("W, A, S, D");

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    // Create Robot sprite
    this.robot = this.add.sprite(20, 420, "robotIdle");
    this.robot.setScale(2);
    this.physics.world.enable([ this.robot ]);
    this.robot.body.setCollideWorldBounds(true);


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
      if(!this.keyboard.D.isDown && !this.keyboard.A.isDown) {
        this.robot.body.setVelocity(0,0);
        this.robot.play("robot_idle", true);
      }

      if(this.keyboard.D.isDown === true) {
        this.robot.setFlip(false, false);
        // this.robot.x +=5;
        this.robot.body.setVelocity(160, 0)
        this.robot.play("robot_run", true);
      }

      if(this.keyboard.A.isDown === true) {
        this.robot.setFlip(true, false);
        // this.robot.x -=5;
        this.robot.body.setVelocity(-160, 0)
        this.robot.play("robot_run", true);
      }



      // this.background.tilePositionY -= 0.5;

    }

    moveShip(ship, speed) {
      const config = this.game.config;

      ship.y += speed;
      if (ship.y > config.height) {
        this.resetShipPos(ship);
      }
    }

    resetShipPos(ship){
      const config = this.game.config;

      ship.y = 0;
      var randomX = Phaser.Math.Between(0, config.width);
      ship.x = randomX;
    }


    destroyShip(pointer, gameObject) {
      gameObject.setTexture("explosion");
      gameObject.play("explode");
    }



}

export default Scene2;
