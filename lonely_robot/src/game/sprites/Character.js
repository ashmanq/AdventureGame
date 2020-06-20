import Phaser, { Sprite } from "phaser";
// import React from "react"
class Character extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y, 'robotIdle');

        // this.play('thrust');

        //  You can either do this:
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //  Or this, the end result is the same
        // scene.sys.displayList.add(this);
        // scene.sys.updateList.add(this);
        // scene.sys.arcadePhysics.world.enableBody(this, 0);

        this.inventory = [];
        //  Set some default physics properties
        this.setScale(1.5);
        // this.physics.world.enable([this]);
        this.setCollideWorldBounds(true);

        this.setDepth(10);
        this.body.onWorldBounds = true;
        this.body.setSize(70, 90);

    }

}
export default Character;
