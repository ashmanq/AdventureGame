import Phaser from 'phaser';
import Character from "./sprites/Character.js";
import Npc from  "./sprites/Npc.js";
import CreateSpeechBox from "./textbox/SpeechBox.js";
import Speech from "./sprites/Speech.js";
import Item from './sprites/Item.js';


class Room1 extends Phaser.Scene {

  constructor(props){
    super("room1");

    this.requiredItem = "drawing";
    this.itemToGet = "microchip";
  }

  init(data) {
    this.data = data;
    // To position player depending on which room they've came from
    this.startPosX = 50;
    if(data.start_x_pos) {
      this.startPosX = data.start_x_pos;
    }

    console.log(this.game.inventory);
    console.log(this.game.gameData);
  }


  create() {
    // Stop sprites from leaving boundary of scene
    this.physics.world.setBoundsCollision(true, true, true, true);
    const config = this.game.config;

    // Keyboard inputs
    this.keyboard = this.input.keyboard.addKeys("W, A, S, D, RIGHT, LEFT, ENTER");

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "r1_background");
    this.background.setOrigin(0, 0);

    // Create Robot sprite
    this.robot = new Character(this, this.startPosX, 390);

    // Create NPC sprite
    this.npc = new Npc(this, 600, 390, this.requiredItem, this.itemToGet, 'oldLady', Speech[0]);

    // Item in room
    if(!this.game.gameData.room1Complete) {
      this.item = new Item(this, 120, 368, this.requiredItem);
      this.physics.world.enable([ this.item ]);
    }


    if(this.data.returning) {
      this.robot.setFlip(true, false);
    }

    // Create Door sprite
    this.exitDoor = this.add.image(config.width - 10 , 366, "door");

    // Enable physics for collision detection
    this.physics.world.enable([ this.exitDoor ]);

    this.physics.add.overlap(this.robot, this.exitDoor,
      function() {
        // const data = {
        //   inventory: this.robot.getData('inventory')
        // }
        this.scene.start("room2");
      },
      function() {
        const found = this.game.inventory.find((item) => {
          return item === this.itemToGet;
        });
        console.log(found);
        if (found) {
          return true;
        } return false;
      }, this);

    // When overlaping NPC
    this.physics.add.overlap(this.robot, this.npc, function() {
      const speech = (this.robot.speak(this.npc, this.game.inventory));
      this.speechBox.start(speech, 60);
    },function() {
      // Check to see if the following is true beforehand
      if (!this.robot.data.values.isTalking && this.keyboard.ENTER.isDown){
        this.robot.data.values.isTalking = true;
        return true;
      } return false;
    }, this);

    // When main character overlaps an item
    this.physics.add.overlap(this.robot, this.item, function() {
      this.game.inventory.push(this.item.name);
      this.item.destroy();
      this.speechBox.start("You have found a microchip!", 60);
      console.log(this.game.inventory);
    },function() {
      // Check to see if the following is true beforehand
      if (this.keyboard.ENTER.isDown && !this.item.found){
        this.item.found = true;
        return true;
      } return false;
    }, this);


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


   this.speechBox = CreateSpeechBox(this, 130, 470, {
                wrapWidth: config.width - 400,
                fixedWidth: config.width - 400,
                fixedHeight: 75,
            }, this.robot)
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
