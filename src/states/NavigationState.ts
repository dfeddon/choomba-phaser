import CharacterView from "../views/CharacterViews";
import { CharacterVO } from "../models/CharactersVO";
import { AtlasPrefixTypeVO } from "../models/AtlasPrefixTypesVO";
import { AtlasVO } from "../models/AtlasVO";
import { AtlasFrameVO } from "../models/AtlasFramesVO";

// import * as data from "../public/assets/atlas.json";
import { VectorVO } from "../models/VectorsVO";

export default class NavigationState extends Phaser.State {
  crewCombatAttack: Phaser.Group;
  crewCombatDefend: Phaser.Group;
  crewActionAttack: Phaser.Group;
  crewActionDefend: Phaser.Group;

  man1: Phaser.Sprite;
  man2: Phaser.Sprite;
  zomb1: Phaser.Sprite;
  cat1: CharacterView;//Phaser.Sprite;
  cute1: Phaser.Sprite;

  crew: Phaser.Group;
  defenders: Phaser.Group;

  // json: JSON;

  test: CharacterView;

  preload() {
    console.log("== NavigationState.preload ==");
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
    console.log("== NavigationState.create ==");

    // local json file contains all character atlas animation data
    // this.json = (<any>data).characters;
    // console.log(this.json);

    // run on create
    this.doRun();
  }

  doCombat() {
    // var vo: CharacterVO = new CharacterVO("catlvl01", "Cool Cat", new VectorVO(200, 200));
    // // console.log("* character vo", vo);
    // this.test = new CharacterView(this.game, vo);//, "catlvl01");
    this.crew = this.game.add.group();
    // this.crew.visible = false;

    // load characters
    var cat1vo: CharacterVO = new CharacterVO("catlvl01", "Cat 1", new VectorVO(100, 400));
    this.cat1 = new CharacterView(this.game, cat1vo);
    this.crew.add(this.cat1);

    var man1vo: CharacterVO = new CharacterVO("char01", "Man 1", new VectorVO(200, 400));
    this.man1 = new CharacterView(this.game, man1vo);
    this.crew.add(this.man1);

    var cute1vo: CharacterVO = new CharacterVO("cutechar01", "Cute 1", new VectorVO(285, 400));
    this.cute1 = new CharacterView(this.game, cute1vo);
    this.crew.add(this.cute1);

    var zomb1vo: CharacterVO = new CharacterVO("zombie01", "Zombie 1", new VectorVO(400, 400));
    this.zomb1 = new CharacterView(this.game, zomb1vo);
    this.crew.add(this.zomb1);

    // this.zomb1 = this.game.add.sprite(
    //   0,
    //   0,
    //   "zombie01",
    //   "Idle/skeleton-Idle_0.png"
    // );
    // this.zomb1.animations.add(
    //   "zomb1_idle",
    //   Phaser.Animation.generateFrameNames(
    //     "Idle/skeleton-Idle_",
    //     0,
    //     17,
    //     ".png",
    //     1
    //   ),
    //   10,
    //   true,
    //   false
    // );
    // this.zomb1.scale.setTo(0.75, 0.75); // scale to 75%
    // this.zomb1.anchor.setTo(0.5, 1); // center x/y values
    // this.zomb1.position.x = 400;
    // this.zomb1.position.y = 400;
    // this.zomb1.play("zomb1_idle", 24, true);
  }

  doRun() {
    console.log("== NavigationState.doRun ==");
    var _this = this;

    // show navigation ui
    document.getElementById("navigation-ui-container").style.display = "grid";

    // clear game world
    this.game.world.removeAll();

    // start combat
    this.doCombat();

    // Stretch to fill
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    //  var text = "Hello World!";
    //  var style = { font: "65px Arial", fill: "#ff0000", align: "center" };
    //  this.game.add.text(0, 0, text, style);

    // event handlers
    document.getElementById("exitNav").addEventListener("click", function(e) {
        console.log("exiting navigation state");
        // pause game
        // _this.game.paused = true;
        // hide navigationState
        document.getElementById("navigation-ui-container").style.display = "none";
        // switch to ResultsState
        _this.game.state.start("ResultsState", true, false);
      });
  }
}
// export { NavigationState };