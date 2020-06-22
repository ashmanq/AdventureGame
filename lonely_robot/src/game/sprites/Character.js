import Phaser from "phaser";
// import React from "react"
class Character extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y, 'robotIdle');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        //  Set some default physics properties
        this.setScale(2.5);
        this.setCollideWorldBounds(true);
        this.setData(
          {
             isTalking: false,
             canMove: true,
             speechCounter: 0
           })

        this.setDepth(10);
        this.body.onWorldBounds = true;
        this.body.setSize(30, 58);

    }

    interact(npc, scene) {
      // If task is complete then no more interaction is needed
      if (npc.data.values.taskCompleted) return npc.data.values.speech.taskComplete;

      if(!npc.data.values.taskInProgress) {
        npc.setData('taskInProgress', true);
        return npc.data.values.speech.speech;
      }
      // Get required item from npc
      const requiredItem = npc.data.values.requiredItem;

      // Search inventory to see if we have the item
      const found = scene.inventory.findIndex((item) => {
        return item.name === requiredItem.name;
      })

      if(found !== -1) {

        if(!npc.data.values.taskCompleted) {
          // We add the item given by NPC and remove the item we give to the NPC
          scene.inventory.push(npc.data.values.itemToGive);
          scene.inventory.splice(found, 1);
          npc.data.values.taskCompleted = true;

          // Emit to indicate inventory update and task completion
          scene.emitter.emit('task-completed');
          scene.emitter.emit('inventory-updated');
          return npc.data.values.speech.taskSuccess;
        }
      }
      else {
        return npc.getData('speech').taskIncomplete;
      }

    }


}



export default Character;
