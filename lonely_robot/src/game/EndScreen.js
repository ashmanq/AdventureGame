import Phaser from 'phaser';

class EndScreen extends Phaser.Scene {


  constructor(props){
    super("endScreen");
    this.text = "End!";
  }

  create() {

    // Keyboard inputs
    this.keyboard = this.input.keyboard.addKeys("ENTER");


    const endText = this.add.text(20, 20, this.text, {
      font: "25px Arial",
      fill: "yellow"
    });

    Phaser.Display.Align.In.Center(endText, this.add.zone(400, 300, 800, 600));
  }

  update() {
    if(this.keyboard.ENTER.isDown) {
      this.scene.start("loadingGame");
    }
  }

}

export default EndScreen;
