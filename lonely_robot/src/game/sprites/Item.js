import Phaser from "phaser";



class Item extends Phaser.Physics.Arcade.Sprite {

  constructor (scene, x, y, imageName) {
    super(scene, x, y, imageName);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.name = imageName;
  }



}

export default Item;
