import Phaser from "phaser";
// import React from "react"
class Character extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y, 'robotIdle');

        //  You can either do this:
        scene.add.existing(this);
        scene.physics.add.existing(this);


        //  Set some default physics properties
        this.setScale(1.5);
        // this.physics.world.enable([this]);
        this.setCollideWorldBounds(true);
        this.setData(
          {
             // inventory: [],
             isTalking: false,
             canMove: true,
             speechCounter: 0
           })

        this.setDepth(10);
        this.body.onWorldBounds = true;
        this.body.setSize(70, 90);


    }
    //
    // setInventory(items) {
    //   this.setData('inventory', items);
    // }

    speak(npc, inventory) {


      if (npc.data.values.taskCompleted) return npc.data.values.speech.taskComplete;

      if(!npc.data.values.taskInProgress) {
        npc.setData('taskInProgress', true);
        return npc.data.values.speech.speech;
      }
      // Get required item from npc
      const requiredItem = npc.data.values.requiredItem;

      // Search inventory to see if we have the item
      const found = inventory.findIndex((item) => {
        return item === requiredItem;
      })

      if(found !== -1) {

        if(!npc.data.values.taskCompleted) {

          inventory.push(npc.data.values.itemToGive);
          npc.data.values.taskCompleted = true;
          return npc.data.values.speech.taskSuccess;
        }
      }
      else {
        return "Still to get item!";
      }

    }


}



export default Character;
