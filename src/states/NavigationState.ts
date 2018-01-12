import CharacterView from "../views/CharacterViews";
// import { CharacterVO } from "../models/CharactersVO";
// import { AtlasPrefixTypeVO } from "../models/AtlasPrefixTypesVO";
// import { AtlasVO } from "../models/AtlasVO";
// import { AtlasFrameVO } from "../models/AtlasFramesVO";

// import * as data from "../public/assets/atlas.json";
import { VectorVO } from "../models/VectorsVO";
// import { CharacterDataVO } from "../models/CharacterDataVO";
import CombatUIView from "../views/CombatUIView";
import CombatStageView from "../views/CombatStageView";
import CrewView from "../views/CrewView";
import { TilemapObjectVO } from "../models/TilemapObjectsVO";
import { BackgroundView } from "../views/BackgroundView";
import { NavigationController } from "../controllers/NavigationController";
import { CharacterVO } from "../models/CharactersVO";
import { IncidentVO } from "../models/IncidentsVO";
import { CrewVO } from "../models/CrewsVO";
import { Globals } from "../services/Globals";
import { AWSService } from "../services/AWSService";

export default class NavigationState extends Phaser.State {
  private _inCombat: boolean;
  private _incident: IncidentVO;
  private _opponent: number[];
  combatStageView: CombatStageView;
  combatUIView: CombatUIView;
  crewCombatAttack: CrewView;// Phaser.Group;
  crewCombatDefend: CrewView;//Phaser.Group;
  // gameBG: Phaser.TileSprite;
  uiBG: Phaser.TileSprite;
  worldScale: number;
  scaleUp: boolean;
  scaleDown: boolean;
  walkForward: boolean = false;
  walkBackward: boolean = false;

  // crew: Phaser.Group;
  // defenders: Phaser.Group;

  // json: JSON;

  test: CharacterView;

  constructor() {//incident: IncidentVO) {
    super();

    // if (incident)
    //   this.incident = incident;

    console.log("== NavigationState constuctor ==");
    // console.log("* incident", incident);
  }

	public get inCombat(): boolean {
		return this._inCombat;
	}

	public set inCombat(value: boolean) {
    this._inCombat = value;
    
		if (value === true) {
      this.combatBegin();
    } else {
      this.combatEnd();
    }
	}

	public get incident(): IncidentVO {
		return this._incident;
	}

	public set incident(value: IncidentVO) {
		this._incident = value;
  }

  public get opponent(): number[] {
    return this._opponent;
  }
  
  public set opponent(value: number[]) {
    this._opponent = value;
  }

  init(args: any) {
    console.log("== NavigationState.init ==", args);
    
    // set incident selected from lobby
    this.incident = args.i;
    this.opponent = args.o;
  }

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
    this.game.lockRender = true; // pause update until all characters are loaded
  }

  loadComplete() {
    console.log("== NavigationState.loadComplete ==");
  }

  create() {
    console.log("== NavigationState.create ==");

    // var _this = this;
    var thisRef = this;

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
    // this.game.world.setBounds(0, 0, 2000, window.innerHeight);
    console.log('*****', this.game.world);
    // start arcade physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // game & ui groups
    // this.combatStageView = this.game.add.group(this.game, "combatStageView", true, true, Phaser.Physics.ARCADE);

    this.combatStageView = new CombatStageView(this.game, this, "combatStageView", true);//, true, Phaser.Physics.ARCADE);

    // add combat stage to world (for camera scroll)
    this.game.world.add(this.combatStageView);
    // set game bounds
    // this.game.world.setBounds(this.combatStageView.x, this.combatStageView.y, 2000, this.combatStageView.height);//window.innerHeight);
    
    // this.combatUIView = this.game.add.group(this.game, "combatUIView", true);
    var combatUIView:CombatUIView = new CombatUIView(this.game, null, "combatUIView", true);
    combatUIView.navigationState = this;
    this.combatUIView = combatUIView;
    // combatUIView.fixedToCamera = true;
    // this.combatStageView.add(this.game.world);
    // this.combatStageView.width = this.game.world.width;

    // controller
    var controller = new NavigationController(this, this.combatStageView, combatUIView);

    // size game and ui groups
    
    // establish scale
    var ratio = (window.innerHeight / this.game.cache.getImage("bg").height) / 3;
    // console.log('=========', this.game.height, this.game.height * ratio * 2);
    // add bg as tilesprite to gameBG
    // TODO: set bg width to world/combatStageView width
    // this.combatStageView.bg = new Phaser.TileSprite(this.game, 0, 0, 4000, this.game.height * ratio * 2, 'bg');
    this.combatStageView.bg = new BackgroundView(this.game, ratio);
    // resize bg image height to fit window
    this.combatStageView.ratio = ratio;
    this.combatStageView.addView();
    // this.combatStageView.bg.width = this.combatStageView.width;
    // this.combatStageView.bg.tileScale.set(ratio * 2, ratio * 2);
    // this.combatStageView.add(this.gameBG);
    // send to back
    // this.combatStageView.sendToBack(this.gameBG);
    // this.game.world.sendToBack(this.gameBG);

    // ui group
    combatUIView.y = window.innerHeight / 3 * 2;
    // console.log("* combatUIView", this.combatUIView.x, this.combatUIView.y);
    
    // add bg
    // console.log("****", this.game.world.width);
    this.uiBG = this.game.make.tileSprite(0, 0, window.innerWidth, window.innerHeight / 3, "uibg", 0);
    
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
      thisRef.game.state.start("ResultsState", true, false);
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
		else if ((this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.walkForward) && this.crewCombatAttack.isMobile) {
      console.log("* move forward", this.combatStageView.bg.x);
      // move minimap player
      this.combatUIView.player.vo.dir = CrewView.PLAYER_MOVING_FORWARD;
      // move crew
      this.crewCombatAttack.setState(CharacterView.CHARACTER_STATE_WALK_FORWARD);//this.combatUIView.player.vo.backwardDir);

      // if moving...
      // if (this.crewCombatAttack.position.x < this.game.world.width) {
      // console.log('bg.x', this.combatStageView.bg.x, this.combatStageView.bg.width);
      if (this.combatStageView.bg.x <= 0 && this.combatStageView.bg.x > 0 - this.combatStageView.bg.totalWidth) {
        this.combatUIView.playerMove(CrewView.PLAYER_MOVING_FORWARD);
        this.combatStageView.bg.x -= 2.5;
      }
      else if (this.crewCombatAttack.currentState !== 0)
        this.crewCombatAttack.setState(CharacterView.CHARACTER_STATE_IDLE);
    }
		else if ((this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.walkBackward) && this.crewCombatAttack.isMobile) {
      // console.log(this.combatStageView.bg.x);
      // if (this.crewCombatAttack.position.x > 0) {
      if (this.combatStageView.bg.x < 0) {
        this.combatUIView.player.vo.dir = CrewView.PLAYER_MOVING_BACKWARD;
        this.combatUIView.playerMove(CrewView.PLAYER_MOVING_BACKWARD);//this.combatUIView.player.vo.forwardDir);
        this.crewCombatAttack.setState(CharacterView.CHARACTER_STATE_WALK_BACKWARD);
        this.combatStageView.bg.x += 2.5;
      }
      else if (this.crewCombatAttack.currentState !== 0)
        this.crewCombatAttack.setState(CharacterView.CHARACTER_STATE_IDLE);
    }
    else if (this.crewCombatAttack && this.crewCombatAttack.currentState !== 0) {
      this.crewCombatAttack.setState(0);
    }
      
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
    var __this = this;
    console.log("== NavigationState.doRun ==", this.incident);
    // var _this = this;

    // show/hide navigation ui
    document.getElementById("navigation-ui-container").style.display = "none";
    document.getElementById("navigation-controls-container").style.display = "none";//"grid";

    // // clear game world
    // this.game.world.removeAll();

    // init by incident
    switch(this.incident.type) {
      case IncidentVO.INCIDENT_TYPE_SPAWN: 
      break;
      
      case IncidentVO.INCIDENT_TYPE_DEFEND: 
      break;

      case IncidentVO.INCIDENT_TYPE_BRAWL:
      break;
    }

    // Stretch to fill
    // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    // get crew
    // console.log("* globals", Globals.getInstance().player.entity.characters);
    let pool: CharacterVO[] = Globals.getInstance().player.entity.characterPool;
    let crew: CharacterVO[] = [];
    for (let character of pool) {
      if (character.position > 0)
        crew.push(character);
    }
    console.log("* crew", crew);
    console.log("* incident", this.incident);

    // determine attacker/defender

    // start combat
    /*
    var attackers: CharacterDataVO[] = [
      new CharacterDataVO("steampunk02"),// "Cat 1"), 
      new CharacterDataVO("steampunk01"),//, "Man 1"),
      new CharacterDataVO("steampunk01"),//, "Steampunk 1"),
      new CharacterDataVO("robot01")//, "Robot 1")
    ];
    var defenders: CharacterDataVO[] = [
      new CharacterDataVO("steampunk02"),//, "Cat 1"), 
      new CharacterDataVO("steampunk01"),//, "Man 1"),
      new CharacterDataVO("steampunk02"),//, "Steampunk 1"),
      new CharacterDataVO("robot01")//, "Robot 1")
    ];
    */
    // var attackers: CrewVO = new CrewVO();
    // attackers.characters = [
    // ]
    // get opponent characterVO's
    // var o: CharacterVO[];
    AWSService.getInstance().dynamoose.getCharactersByArray(this.opponent, function (result: CharacterVO[]) {
      // o = result;
      __this.initIncident(crew, result);//[]);//defenders);
    });
    // this.initIncident(crew, this.opponent);//[]);//defenders);

    //  var text = "Hello World!";
    //  var style = { font: "65px Arial", fill: "#ff0000", align: "center" };
    //  this.game.add.text(0, 0, text, style);

  }

  initIncident(attackersArray: CharacterVO[], defendersArray: CharacterVO[]) {
    console.log("== NavigationState.initIncident() ==");
    this.crewCombatAttack = new CrewView(this.game, 0, 0, "", 0);
    this.crewCombatAttack.addCrewMembers(attackersArray, true);
    if (defendersArray && defendersArray.length > 0) {
      console.log("* adding defenders crew");
      this.crewCombatDefend = new CrewView(this.game, 0, 0, "", 0);
      this.crewCombatDefend.addCrewMembers(defendersArray, false);
    }
    // create attackers group
    // this.crewCombatAttack = this.game.add.group();
    
    // add it to game stage
    this.combatStageView.crewAttack = this.crewCombatAttack;
    if (this.crewCombatDefend)
      this.combatStageView.crewDefend = this.crewCombatDefend;

    // enable mobility
    this.crewCombatAttack.isMobile = true;

    // restart update
    this.game.lockRender = false;
    // this.game.debug.spriteInfo(this.combatStageView.crewAttack, 32, 32);
    // add attacking characters to group, from back to front
    // var attacker: CharacterView;
    // var lastVector: VectorVO = new VectorVO(15, (this.game.height / 3) * 2);

    // for (var i = 0; i < attackersArray.length; i++) {
    //   // create character view
    //   attacker = new CharacterView(this.game, new CharacterVO(attackersArray[i].key, attackersArray[i].handle, new VectorVO(lastVector.x, lastVector.y)));
    //   // add character to group
    //   this.crewCombatAttack.add(attacker);
    //   // update last vector
    //   lastVector.x = attacker.x + 125;//attacker.width;
    // }

    // direct camera to follow player 2
    // this.game.physics.arcade.enable(this.crewCombatAttack);
    // var cam = this.game.camera;
    // console.log("* world", this.game.world);//.getBounds());//.width);
    // this.combatStageView.add(this.game.camera);
    // console.log("* crew w/h", this.crewCombatAttack.width, this.crewCombatAttack.height);
    // cam.follow(this.crewCombatAttack);//.children[3] as Phaser.Sprite);
    // cam.follow(this.crewCombatAttack as Phaser.Sprite, Phaser.Camera.FOLLOW_LOCKON);
  }


	combatBegin() {
		console.log("== combatBegin ==");

    // show defending crew
    // this.initIncident();

		// cease all crew movement
		this.combatStageView.crewAttack.isMobile = false;
    this.combatStageView.crewDefend.isMobile = false;
    
    // show combat UI

    // hide navigation UI
	}

	combatEnd() {
		console.log("== combatEnd ==");

		// restore mobility
    this.combatStageView.crewAttack.isMobile = true;
    
    // hide combat UI

    // show navigation UI
	}

  inputEvent(key: string) {
    console.log("* input Event", key);
    console.log("* character", "fired key", key);
  }

  characterClickHandler(vo: CharacterVO) {
    console.log("* got character click signal", vo.handle, vo.view.x, vo.view.y, vo.characterCombat);
  }
}
// export { NavigationState };