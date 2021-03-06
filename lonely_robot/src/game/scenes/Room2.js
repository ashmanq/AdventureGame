import Phaser from 'phaser';
import Character from "../sprites/Character.js";
import Npc from  "../sprites/Npc.js";
import Speech from "../sprites/Speech.js"
import CreateSpeechBox from "../textbox/SpeechBox.js";
import Item from '../sprites/Item.js';

class Room2 extends Phaser.Scene {


  constructor(props){
    super("room2");

    this.requiredItem = {name: "bread", description: "a loaf of bread"};
    this.itemToGet = {name: "battery", description: "a battery"};
  }

  init(data) {
    this.data = data;
    // To position player depending on which room they've came from
    this.startPosX = 80;
    if(data.returning) {
      this.startPosX = data.start_x_pos;
      data.returning = null;
    }

    this.inventory = this.registry.get("inventory");
    this.gameData = this.registry.get("gameData");

    // console.log(this.inventory);
    // console.log(this.gameData);
  }


  create() {
    this.music = this.sound.add('main');
    this.music.stop();

    // We create an event emitter to handle when inventory is updated
    // and the task for the room is complete
    this.emitter = new Phaser.Events.EventEmitter();

    // Stop sprites from leaving boundary of scene
    this.physics.world.setBoundsCollision(true, true, true, true);
    const config = this.game.config;

    // Keyboard inputs
    this.keyboard = this.input.keyboard.addKeys("W, A, S, D, RIGHT, LEFT");

    // Load background
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "r2_background");
    this.background.setOrigin(0, 0);

    // Create Robot sprite
    this.robot = new Character(this, this.startPosX, 390);

    // If the character is returning to the room then we flip its direction
    if(this.data.returning) {
      this.robot.setFlip(true, false);
    }

    // Create NPC sprite
    this.npc = new Npc(this, 450, 390, this.requiredItem, this.itemToGet, 'soldierNpc', Speech[1]);

    // Create item in room
    if(!this.gameData.room2Complete) {
      this.item = new Item(this, 120, 368, this.requiredItem);
    }


    // Create Door sprite
    this.entryDoor = this.add.image(10 , 366, "door");
    this.entryDoor.setInteractive( { useHandCursor: true  } );
    this.physics.world.enable([ this.entryDoor ]);

    this.exitDoor = this.add.image(config.width - 10 , 366, "door");
    this.exitDoor.setInteractive( { useHandCursor: true  } );
    this.physics.world.enable([ this.exitDoor ]);

    this.physics.add.overlap(this.robot,   this.entryDoor,     function() {
          const data = {
            start_x_pos: 700,
            returning: true,
          }
          this.scene.start("room1", data);
      }, null, this);


    this.physics.add.overlap(this.robot,   this.exitDoor,     function() {

          this.scene.start("room3");
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

    this.entryDoor.on('pointerdown', function() {
      this.speechBox.start(`[color=green]The door we came in from[/color]`, 60);
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

    // Event Listeners
    this.emitter.on('inventory-updated', () => {
      this.game.updateInventory(this.inventory);
    })

    this.emitter.on('task-completed', () => {
      this.gameData.room2Complete = true;
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
      frameRate: 3,
      repeat: -1 //infinite loop
    });

    // Speech Box
    this.speechBox = CreateSpeechBox(this, 100, 470, {
                 wrapWidth: config.width - 300,
                 fixedWidth: config.width - 300,
                 fixedHeight: 75,
             })

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

export default Room2;
