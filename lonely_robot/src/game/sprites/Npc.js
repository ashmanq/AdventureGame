import Phaser from "phaser";

class Npc extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y, requiredItem, itemToGive, name, speech)
    {
        super(scene, x, y, name);

        //  You can either do this:
        scene.add.existing(this);
        scene.physics.add.existing(this);



        //  Set some default physics properties
        this.setScale(2.5);
        this.setCollideWorldBounds(true);

        this.body.onWorldBounds = true;
        this.body.setSize(35, 50);
        this.setDepth(1);
        this.setData("speechCounter", 0);
        this.setData("taskInProgress", false);
        this.setData("taskCompleted", false);
        this.setData("requiredItem", requiredItem);
        this.setData("itemToGive", itemToGive);
        this.setData("speech", speech);
        this.setData("icon", name);

        this.setInteractive( { useHandCursor: true  } );

    }

    checkItem(item) {

      if(item === this.requiredItem) {
        this.data.values.taskCompleted = true;
      }
    }

}

export default Npc;
