import Phaser from 'phaser';
import Character from "../sprites/Character.js";
import Npc from  "../sprites/Npc.js";
import CreateSpeechBox from "../textbox/SpeechBox.js";
import Speech from "../sprites/Speech.js";
import Item from '../sprites/Item.js';


class Room1 extends Phaser.Scene {

  constructor(props){
    super("room1");

    this.requiredItem = {name: "drawing", description: "a drawing. It's a picture of a square tank"};
    this.itemToGet = {name: "microchip", description: "a microchip. It's seen better days."};
  }

  init(data) {
    this.data = data;
    // To position player depending on which room they've came from
    this.startPosX = 50;
    if(data.start_x_pos) {
      this.startPosX = data.start_x_pos;
    }
    this.inventory = this.registry.get("inventory");
    this.gameData = this.registry.get("gameData");
    console.log(this.inventory);
    console.log(this.gameData);
  }


  create() {
    // We create an event emitter to handle when inventory is updated
    // and the task for the room is complete
    this.emitter = new Phaser.Events.EventEmitter();

    // Stop sprites from leaving boundary of scene
    this.physics.world.setBoundsCollision(true, true, true, true);
    const config = this.game.config;

    // Keyboard inputs
    this.keyboard = this.input.keyboard.addKeys("W, A, S, D, RIGHT, LEFT, ENTER");

    // Load background
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "r1_background");
    this.background.setOrigin(0, 0);

    // Create Robot sprite
    this.robot = new Character(this, this.startPosX, 390);

    // If the character is returning to the room then we flip its direction
    if(this.data.returning) {
      this.robot.setFlip(true, false);
    }

    // Create NPC sprite
    this.npc = new Npc(this, 600, 390, this.requiredItem, this.itemToGet, 'oldLady', Speech[0]);

    // Create item in room
    if(!this.gameData.room1Complete) {
      this.item = new Item(this, 120, 368, this.requiredItem, "a drawing");
    }

    // Create Door sprite for exit
    this.exitDoor = this.add.image(config.width - 10 , 366, "door");
    this.exitDoor.setInteractive();

    // Enable physics for collision detection
    this.physics.world.enable([ this.exitDoor ]);

    // Handle when character touches exit door
    this.physics.add.overlap(this.robot, this.exitDoor,
      function() {
        this.scene.start("room2");
      },
      function() {
        const found = this.inventory.find((item) => {
          return item.name === this.itemToGet.name;
        });
        if (found) {
          return true;
        } return false;
      }, this);

      this.exitDoor.on('pointerdown', function() {
        const found = this.inventory.find((item) => {
          return item.name === this.itemToGet.name;
        });
        if (!found) {
          this.speechBox.start(`[color=red]Door is locked![/color]`, 60);
        } else {
          this.speechBox.start(`[color=green]The door is now unlocked![/color]`, 60);
        }
      }, this)


    // When clicking on npc
    this.npc.on('pointerdown', function() {
      const speech = (this.robot.interact(this.npc, this));
      this.speechBox.start(speech, 60);
    }, this)


    // When clicking on item
    this.item.on('pointerdown', function() {
      this.inventory.push(this.item);
      this.emitter.emit('inventory-updated');
      this.item.destroy();
      this.speechBox.start(`You have found ${this.item.description}!`, 60);
    }, this)

    this.emitter.on('inventory-updated', () => {
      this.game.updateInventory(this.inventory);
    })

    this.emitter.on('task-completed', () => {
      this.gameData.room1Complete = true;
    })



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

      if(!this.keyboard.D.isDown && !this.keyboard.RIGHT.isDown === true
        && !this.keyboard.LEFT.isDown && !this.keyboard.A.isDown) {
        this.robot.body.setVelocity(0,0);
        this.robot.play("robot_idle", true);
      }

      if(this.keyboard.D.isDown === true || this.keyboard.RIGHT.isDown === true) {
        this.robot.setFlip(false, false);
        this.robot.body.setVelocity(300, 0)
        this.robot.play("robot_run", true);
      }

      if(this.keyboard.A.isDown === true || this.keyboard.LEFT.isDown === true) {
        this.robot.setFlip(true, false);
        this.robot.body.setVelocity(-300, 0)
        this.robot.play("robot_run", true);
      }


    }



}

export default Room1;
