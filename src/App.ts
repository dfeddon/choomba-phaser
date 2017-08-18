class App {
  
  game: Phaser.Game;
  man1: Phaser.Sprite;
  man2: Phaser.Sprite;
  zomb1: Phaser.Sprite;

  constructor() {
    this.game = new Phaser.Game(
      window.innerWidth * window.devicePixelRatio - 15,
      window.innerHeight * window.devicePixelRatio / 1.6,
      Phaser.AUTO,
      "content",
      {
        preload: this.preload,
        create: this.create,
        update: this.update,
        render: this.render
      }
    );
  }

  preload() {
    console.log("== preload ==");
    this.game.load.crossOrigin = true;
    // "http://s3.amazonaws.com/com.dfeddon.choomba/spritesheets/boy1-idle.png";
    this.game.load.spritesheet("uniqueKey", 'boy1-idle.png', 132, 185);//132, 186); //, 10);
    this.game.load.spritesheet("uniqueKey2", 'boy2-idle.png', 132, 185);//132, 186); //, 10);
    this.game.load.spritesheet("uniqueKey3", 'zombie1-idle.png', 172, 182);//132, 186); //, 10);
  }
  create() {
    console.log("== create ==");
    // Stretch to fill
    // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    //  var text = "Hello World!";
    //  var style = { font: "65px Arial", fill: "#ff0000", align: "center" };
    //  this.game.add.text(0, 0, text, style);
    this.man1 = this.game.add.sprite(0, 0, "uniqueKey", 0);
    this.man1.animations.add("idle");
    this.man1.position.y = 200;
    // Play the animation we just created at 10fps, looping forever
    this.man1.play("idle", 30, true);

    this.man2 = this.game.add.sprite(0, 0, "uniqueKey2", 0);
    this.man2.animations.add("idle");
    this.man2.position.x = 300;
    this.man2.position.y = 200;
    this.man2.play("idle", 30, true);

    this.zomb1 = this.game.add.sprite(0, 0, "uniqueKey3", 0);
    this.zomb1.animations.add("idle");
    this.zomb1.position.x = 120;
    this.zomb1.position.y = 200;
    this.zomb1.play("idle", 30, true);
  }
  render() {
    // console.log("* render");
  }
  update() {

  }
}

window.onload = () => {
  var game = new App();
};
