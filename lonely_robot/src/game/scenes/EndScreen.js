import Phaser from 'phaser';

class EndScreen extends Phaser.Scene {


  constructor(props){
    super("endScreen");
    this.text = "End!";
  }

  init() {
    // We reset global game data when the game ends
    this.game.gameData = { room1Complete: false, room2Complete: false, room3Complete: false };
    this.game.inventory = [];
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
