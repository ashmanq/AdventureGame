import Phaser from "phaser";
// import React from "react"
class Npc extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y, inventoryItem, name)
    {
        super(scene, x, y, name);

        //  You can either do this:
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.inventoryItem = inventoryItem;

        //  Set some default physics properties
        this.setScale(1.5);
        this.setCollideWorldBounds(true);

        this.body.onWorldBounds = true;
        this.body.setSize(70, 90);
        this.setDepth(1);

    }

}

export default Npc;
