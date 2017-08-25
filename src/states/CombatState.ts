import CharacterView from "../views/CharacterViews";

export default class CombatState extends Phaser.State {
  crewCombatAttack: Phaser.Group;
  crewCombatDefend: Phaser.Group;
  crewActionAttack: Phaser.Group;
  crewActionDefend: Phaser.Group;

  man1: Phaser.Sprite;
  man2: Phaser.Sprite;
  zomb1: Phaser.Sprite;
  cat1: Phaser.Sprite;
  cute1: Phaser.Sprite;

  test: CharacterView;

  preload() {
    console.log("== CombatState.preload ==");
    this.game.load.crossOrigin = true;
    // "http://s3.amazonaws.com/com.dfeddon.choomba/spritesheets/boy1-idle.png";
    // this.game.load.spritesheet("uniqueKey", "../images/spritesheets/boy1-idle.png", 132, 185); //132, 186); //, 10);
    // this.game.load.spritesheet("uniqueKey2", "../images/spritesheets/boy2-idle.png", 132, 185); //132, 186); //, 10);
    // this.game.load.spritesheet(
    //   "uniqueKey3",
    //   "../images/spritesheets/zombie1-idle.png",
    //   172,
    //   182 // 186
    // ); //132, 186); //, 10);
    // this.game.load.atlasJSONHash("char01", "../images/spritesheets/char01.png", "../images/spritesheets/char01.json");
    // this.game.load.atlasJSONHash("cutechar01", "../images/spritesheets/cutechar01.png", "../images/spritesheets/cutechar01.json");
    // this.game.load.atlasJSONHash("zombie01", "../images/spritesheets/zombie01.png", "../images/spritesheets/zombie01.json");
    // this.game.load.atlasJSONHash("catlvl01", "../images/spritesheets/catlvl01.png", "../images/spritesheets/catlvl01.json");
  }

  create() {
    console.log("== CombatState.create ==");
    // Stretch to fill
    // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    //  var text = "Hello World!";
    //  var style = { font: "65px Arial", fill: "#ff0000", align: "center" };
    //  this.game.add.text(0, 0, text, style);

    // this.man1 = this.game.add.sprite(0, 0, "uniqueKey", 0);
    // this.man1.animations.add("idle");
    this.test = new CharacterView(this.game, 200, 200);//, "catlvl01");

    this.cat1 = this.game.add.sprite(
      0,
      0,
      "catlvl01",
      "Idle/skeleton-Idle_0.png"
    );
    this.cat1.animations.add(
      "catlvl01_idle",
      Phaser.Animation.generateFrameNames(
        "Idle/skeleton-Idle_",
        0,
        17,
        ".png",
        1
      ),
      10,
      true,
      false
    );
    this.cat1.scale.setTo(0.75, 0.75); // scale to 75%
    this.cat1.anchor.setTo(0.5, 1); // centered
    this.cat1.position.x = 100;
    this.cat1.position.y = 400;
    this.cat1.play("catlvl01_idle", 24, true);

    this.man1 = this.game.add.sprite(
      0,
      0,
      "char01",
      "Idle/skeleton-Idle_0.png"
    );
    this.man1.animations.add(
      "char01_idle",
      Phaser.Animation.generateFrameNames(
        "Idle/skeleton-Idle_",
        0,
        9,
        ".png",
        1
      ),
      10,
      true,
      false
    );
    this.man1.scale.setTo(0.75, 0.75); // scale to 75%
    this.man1.anchor.setTo(0.5, 1); // centered
    this.man1.position.x = 200;
    this.man1.position.y = 400;
    this.man1.play("char01_idle", 24, true);

    this.cute1 = this.game.add.sprite(
      0,
      0,
      "cutechar01",
      "Idle/skeleton-Idle_0.png"
    );
    this.cute1.animations.add(
      "cute01_idle",
      Phaser.Animation.generateFrameNames(
        "Idle/skeleton-Idle_",
        0,
        9,
        ".png",
        1
      ),
      10,
      true,
      false
    );
    this.cute1.scale.setTo(0.45, 0.45); // scale to 75%
    this.cute1.anchor.setTo(0.5, 1); // centered
    this.cute1.position.x = 285;
    this.cute1.position.y = 400;
    this.cute1.play("cute01_idle", 24, true);

    this.zomb1 = this.game.add.sprite(
      0,
      0,
      "zombie01",
      "Idle/skeleton-Idle_0.png"
    );
    this.zomb1.animations.add(
      "zomb1_idle",
      Phaser.Animation.generateFrameNames(
        "Idle/skeleton-Idle_",
        0,
        17,
        ".png",
        1
      ),
      10,
      true,
      false
    );
    this.zomb1.scale.setTo(0.75, 0.75); // scale to 75%
    this.zomb1.anchor.setTo(0.5, 1); // center x/y values
    this.zomb1.position.x = 400;
    this.zomb1.position.y = 400;
    this.zomb1.play("zomb1_idle", 24, true);
  }
}
// export { CombatState };