import Phaser from 'phaser';

class EndScreen extends Phaser.Scene {


  constructor(props){
    super("endScreen");
    this.text = "Imagine a picture of a post apocalyptic world\ntotally destroyed by war.\n\nIt was at this point the robot realised he probably\nshould have stayed asleep.\n\nThe End!";
  }


  create() {
    // Stop them music
    this.game.music.stop();

    this.registry.set("inventory", []);
    this.registry.set("gameData", { room1Complete: false, room2Complete: false, room3Complete: false });

    //Reset inventory component
    this.game.updateInventory(this.registry.get('inventory'));

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
