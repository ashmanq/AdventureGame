import Phaser, { Sprite } from "phaser";
// import React from "react"
class Npc extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y, inventoryItem, name)
    {
        super(scene, x, y, name);

        // this.play('thrust');

        //  You can either do this:
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //  Or this, the end result is the same
        // scene.sys.displayList.add(this);
        // scene.sys.updateList.add(this);
        // scene.sys.arcadePhysics.world.enableBody(this, 0);

        this.inventoryItem = inventoryItem;
        //  Set some default physics properties
        this.setScale(2);
        this.setCollideWorldBounds(true);

        this.body.onWorldBounds = true;
        this.setDepth(1);

    }

}

export default Npc;
