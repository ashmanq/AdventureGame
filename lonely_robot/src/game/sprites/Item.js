import Phaser from "phaser";



class Item extends Phaser.Physics.Arcade.Sprite {

  constructor (scene, x, y, item) {
    super(scene, x, y, item.name);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setInteractive( { useHandCursor: true  } );
    this.name = item.name;
    this.description = item.description;


  }



}

export default Item;
