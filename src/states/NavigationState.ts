import CharacterView from "../views/CharacterViews";
// import { CharacterVO } from "../models/CharactersVO";
import { AtlasPrefixTypeVO } from "../models/AtlasPrefixTypesVO";
import { AtlasVO } from "../models/AtlasVO";
import { AtlasFrameVO } from "../models/AtlasFramesVO";

// import * as data from "../public/assets/atlas.json";
import { VectorVO } from "../models/VectorsVO";
import { CharacterDataVO } from "../models/CharacterDataVO";
import CombatUIView from "../views/CombatUIView";
import CombatStageView from "../views/CombatStageView";
import CrewView from "../views/CrewView";

export default class NavigationState extends Phaser.State {
  combatStageView: CombatStageView;
  combatUIView: CombatUIView;
  crewCombatAttack: CrewView;// Phaser.Group;
  crewCombatDefend: CrewView;//Phaser.Group;
  gameBG: Phaser.TileSprite;
  uiBG: Phaser.TileSprite;
  worldScale: number;
  scaleUp: boolean;
  scaleDown: boolean;

  // crew: Phaser.Group;
  // defenders: Phaser.Group;

  // json: JSON;

  test: CharacterView;

  preload() {
    console.log("== NavigationState.preload ==");
    this.game.load.crossOrigin = true;
    // load bg image
    this.load.image("bg", "/images/cyberpunk-street1.png");
    // load ui bg
    this.game.load.image("uibg", "/images/bg-mesh.png");
    // orientation
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.forceLandscape = true;
    this.load.onLoadComplete.add(this.loadComplete);
  }

  loadComplete() {
    console.log("== NavigationState.loadComplete ==");
  }

  create() {
    console.log("== NavigationState.create ==");

    var _this = this;

    // console.log("* world", this.game.stage.height); // world.width, this.game.world.height);

    // var h:number = (window.innerHeight / 3);
    // console.log(h, window.innerWidth, window.innerHeight);

    this.worldScale = 1; // start at 1:1 (no zoom)
    this.scaleUp = false;
    this.scaleDown = false;

    // set bg color
    this.game.stage.setBackgroundColor("#708090");
    // size game canvas
    this.game.scale.setGameSize(window.innerWidth, window.innerHeight);//h * 2);
    // set game bounds
    this.game.world.setBounds(0, 0, 2000, window.innerHeight);
    // start arcade physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // game & ui groups
    // this.combatStageView = this.game.add.group(this.game, "combatStageView", true, true, Phaser.Physics.ARCADE);
    this.combatStageView = new CombatStageView(this.game, this, "combatStageView", true, true, Phaser.Physics.ARCADE);
    // this.combatUIView = this.game.add.group(this.game, "combatUIView", true);
    var combatUIView:CombatUIView = new CombatUIView(this.game, this, "combatUIView", true);
    combatUIView.navigationState = this;
    // this.combatStageView.add(this.game.world);
    // this.combatStageView.width = this.game.world.width;

    // size game and ui groups
    // establish scale
    var ratio = (window.innerHeight / this.game.cache.getImage("bg").height) / 3;
    // console.log('=========', this.game.height, this.game.height * ratio * 2);
    // add bg as tilesprite to gameBG
    this.combatStageView.bg = new Phaser.TileSprite(this.game, 0, 0, this.game.world.width * ratio * 2, this.game.height * ratio * 2, 'bg');
    // resize bg image height to fit window
    this.combatStageView.ratio = ratio;
    this.combatStageView.addView();
    // this.combatStageView.bg.tileScale.set(ratio * 2, ratio * 2);
    // this.combatStageView.add(this.gameBG);
    // send to back
    // this.combatStageView.sendToBack(this.gameBG);
    // this.game.world.sendToBack(this.gameBG);

    // ui group
    combatUIView.y = window.innerHeight / 3 * 2;
    // console.log("* combatUIView", this.combatUIView.x, this.combatUIView.y);
    // add bg
    this.uiBG = this.game.add.tileSprite(0, 0, this.game.world.width * ratio * 2, window.innerHeight / 3, "uibg");
    // add bg to stage ui
    combatUIView.add(this.uiBG);
    combatUIView.addView();

    // set floor value (to place characters)
    console.log("* game height", this.game.height);
    // if (!this.floor) this.floor = this.game.height;//document.body.offsetHeight - h;//this.game.stage.height - 300; // set this only once!

    // event handlers
    document.getElementById("exitNav").addEventListener("click", function(e) {
      console.log("exiting navigation state");
      // pause game
      // _this.game.paused = true;
      // hide navigationState
      document.getElementById("navigation-ui-container").style.display = "none";
      document.getElementById("navigation-controls-container").style.display = "none";
      // switch to ResultsState
      _this.game.state.start("ResultsState", true, false);
    });

    // run on create
    this.doRun();
  }

  update () {
    // console.log(this.children.length);
    // this.gameBG.tilePosition.x = this.game.camera.x;
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
      // this.worldScale -= 0.5;//0.05;
      console.log('scaleUp', this.worldScale);
      // this.combatStageView.anchor.setTo(0.5, 0.5);
      if (this.worldScale <= 1) {
        this.scaleUp = true;
        
        // blur bg
        var blurX: any = this.game.add.filter("BlurX");
        var blurY: any = this.game.add.filter("BlurY");
        blurX.blur = 7;
        blurY.blur = 7;
        this.combatStageView.bg.filters = [blurX, blurY];
        
        // blur all characters
        var a: CharacterView;
        var d: CharacterView;
        for (var i = 0; i <= 3; i++) {
          a = this.crewCombatAttack.children[i] as CharacterView;
          // ignore if attacker or target
          a.toBackground();
          d = this.crewCombatDefend.children[i] as CharacterView;
          // ignore if attacker or target
          d.toBackground();
        }

        // scale view
        this.combatStageView.scale.set(1.15, 1.15);
      }
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
      // this.worldScale += 0.5;//0.05;
      console.log(this.worldScale);
      if (this.worldScale >= 1.5) {
        this.scaleDown = true;

        // unblur bg
        var blurX: any = this.game.add.filter("BlurX");
        var blurY: any = this.game.add.filter("BlurY");
        blurX.blur = 0;
        blurY.blur = 0;
        this.combatStageView.bg.filters = [blurX, blurY];

        // unblur all characters
        var a: CharacterView;
        var d: CharacterView;
        for (var i = 0; i <= 3; i++) {
          a = this.crewCombatAttack.children[i] as CharacterView;
          a.toForeground();
          d = this.crewCombatDefend.children[i] as CharacterView;
          d.toForeground();
        }

        // un-scale view
        this.combatStageView.scale.set(1, 1);
      }
    }
		// else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    //   this.body.velocity.x = -150;
    //   this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_WALK);

    //   if (this.scale.x > 0) this.scale.x = -0.5; //this.scale.x;
    //   // console.log("*", this.scale.x);
    //   this.anchor.setTo(1, 1); // keep anchor forward-facing
    // } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    //   // console.log(this.animations);
    //   this.body.velocity.x = 150;
    //   this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_WALK);
    //   this.anchor.setTo(0, 1); // keep anchor forward-facing

    //   if (this.scale.x < 0) {
    //     this.scale.x = 0.5;
    //   }
    // } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
    //   this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_ATTACK1);
    //   // this.toBackground();
    // } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.H)) {
    //   this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_HIT1);
    //   this.toForeground();
    // } else {
    //   // this.animations.frame = 0;
    //   this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_IDLE);
    // }
      
    // scale down
    if (this.scaleDown) {
      if(this.worldScale <= 1) {
        this.worldScale = 1;
        this.scaleDown = false;
      }
      else this.worldScale -= 0.025;
    }

    // scale up
    if (this.scaleUp) {
      if (this.worldScale >= 1.5) {
        this.worldScale = 1.5;
        this.scaleUp = false;
      }
      else this.worldScale += 0.25;
    }
    
    // if (this.worldScale > 1 && this.worldScale < 1.5) {
      // this.game.world.scale.set(Phaser.Math.clamp(this.worldScale, 1, 1.5));
      // this.combatStageView.pivot.set(0.5 * this.combatStageView.width, 0.5 * this.combatStageView.height);
      // this.combatStageView.scale.set(Phaser.Math.clamp(this.worldScale, 1, 1.5));
    // }
  }

  shutdown() {
    console.log("== NavigationState.shutdown ==");
    this.game.world.removeAll();
  }

  doRun() {
    console.log("== NavigationState.doRun ==");
    // var _this = this;

    // show navigation ui
    document.getElementById("navigation-ui-container").style.display = "none";
    document.getElementById("navigation-controls-container").style.display = "none";//"grid";

    // // clear game world
    // this.game.world.removeAll();


    // Stretch to fill
    // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    // start combat
    var attackers: CharacterDataVO[] = [
      new CharacterDataVO("steampunk02", "Cat 1"), 
      new CharacterDataVO("steampunk01", "Man 1"),
      new CharacterDataVO("steampunk01", "Steampunk 1"),
      new CharacterDataVO("robot01", "Robot 1")
    ];
    var defenders: CharacterDataVO[] = [
      new CharacterDataVO("steampunk02", "Cat 1"), 
      new CharacterDataVO("steampunk01", "Man 1"),
      new CharacterDataVO("steampunk02", "Steampunk 1"),
      new CharacterDataVO("robot01", "Robot 1")
    ];
    this.initCombat(attackers, defenders);

    //  var text = "Hello World!";
    //  var style = { font: "65px Arial", fill: "#ff0000", align: "center" };
    //  this.game.add.text(0, 0, text, style);

  }

  initCombat(attackersArray: CharacterDataVO[], defendersArary: CharacterDataVO[]) {
    console.log("== NavigationState.initCombat() ==");

    this.crewCombatAttack = new CrewView(this.game, this, "crewAttackers", true);
    this.crewCombatAttack.addCrew(attackersArray, true);
    this.crewCombatDefend = new CrewView(this.game, this, "crewDefenders", true);
    this.crewCombatDefend.addCrew(defendersArary, false);
    // create attackers group
    // this.crewCombatAttack = this.game.add.group();
    // add it to game stage
    this.combatStageView.crewAttack = this.crewCombatAttack;
    this.combatStageView.crewDefend = this.crewCombatDefend;
    
    // add attacking characters to group, from back to front
    // var attacker: CharacterView;
    // var lastVector: VectorVO = new VectorVO(15, (this.game.height / 3) * 2);

    // for (var i = 0; i < attackersArray.length; i++) {
    //   // create character view
    //   attacker = new CharacterView(this.game, new CharacterVO(attackersArray[i].key, attackersArray[i].name, new VectorVO(lastVector.x, lastVector.y)));
    //   // add character to group
    //   this.crewCombatAttack.add(attacker);
    //   // update last vector
    //   lastVector.x = attacker.x + 125;//attacker.width;
    // }

    // direct camera to follow player 2
    // var cam = this.game.camera;
    // // this.combatStageView.add(cam);

    // cam.follow(this.crewCombatAttack.children[3] as Phaser.Sprite);
  }

  inputEvent(key: string) {
    console.log("* input Event", key);
    console.log("* character", "fired key", key);
  }
}
// export { NavigationState };