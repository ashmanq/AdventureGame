import Phaser from 'phaser';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
// const COLOR_DARK = 0x260e04;

const CreateSpeechBox = function (scene, x, y, config, character) {

  const GetValue = Phaser.Utils.Objects.GetValue;
  const wrapWidth = GetValue(config, 'wrapWidth', 0);
  const fixedWidth = GetValue(config, 'fixedWidth', 0);
  const fixedHeight = GetValue(config, 'fixedHeight', 0);

  var textBox = scene.rexUI.add.textBox({
          x: x,
          y: y,

          background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
              .setStrokeStyle(2, COLOR_LIGHT),

          // icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),
          // icon: scene.add.image(0,0, "oldLady"),

          // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
          text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

          action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

          space: {
              left: 20,
              right: 20,
              top: 20,
              bottom: 20,
              icon: 10,
              text: 10,
          }
      })
      .setOrigin(0)
      .layout();

  textBox
      .setInteractive()
      .on('pointerdown', function () {
          var icon = this.getElement('action').setVisible(false);
          this.resetChildVisibleState(icon);
          if (this.isTyping) {
              this.stop(true);
          }
          else {
              this.typeNextPage();
          }
      }, textBox)
      .on('pageend', function () {
          if (this.isLastPage) {
            return;
          }
          var icon = this.getElement('action').setVisible(true);
          this.resetChildVisibleState(icon);
          icon.y -= 30;
          // eslint-disable-next-line
          var tween = scene.tweens.add({
              targets: icon,
              y: '+=30', // '+=100'
              ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
              duration: 100,
              repeat: 0, // -1: infinity
              yoyo: false
          });
      }, textBox)
  //.on('type', function () {
  //})

  return textBox;
}



const getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
  return scene.rexUI.add.BBCodeText(0, 0, '', {
      fixedWidth: fixedWidth,
      fixedHeight: fixedHeight,

      fontSize: '20px',
      wrap: {
          mode: 'word',
          width: wrapWidth
      },
      maxLines: 3
  })
}




export default CreateSpeechBox;
