import { IncidentVO } from "../models/IncidentsVO";
import { NameGenerator } from "fantastical";
import { EntityVO } from "../models/EntitiesVO";
import { CrewVO } from "../models/CrewsVO";
// import { CharacterDataVO } from "../models/CharacterDataVO";
import * as data from "../helpers/stubJson.json";
import { SocketClusterService } from "../services/SocketClusterService";
import { AWSService } from "../services/AWSService";
import { IncidentsSchema } from "../services/Schemas/IncidentsSchema";
import { NumberHelper } from "../helpers/NumberHelper";
import { PlayerVO } from "../models/PlayersVO";
import { Globals } from "../services/Globals";
import { LobbyDropper } from "../controllers/LobbyDropper";
import { CharacterVO } from "../models/CharactersVO";
import { LobbyContentController } from "../controllers/LobbyContentController";
import { CrewContentController } from "../controllers/CrewContentController";
import { LobbyController } from "../controllers/LobbyController";

export default class LobbyState extends Phaser.State {
  globals: Globals = Globals.getInstance();
  lobbyController: LobbyController; // instantiate controller, not view, and instantiate view and service from controller

  // fnc
  combatBegin: any;

  preload() {
    console.log("== LobbyState.preload ==");

    this.game.load.crossOrigin = true;
    // load bg image
    this.load.image("foursquare", "http://s3.amazonaws.com/com.dfeddon.choomba/client/images/structures/four-square.png");
    this.load.image("threecirc", "http://s3.amazonaws.com/com.dfeddon.choomba/client/images/structures/three-circle.png");
    this.load.image("multi-1", "http://s3.amazonaws.com/com.dfeddon.choomba/client/images/structures/multi-1.png");
    this.load.image("multi-tenent", "http://s3.amazonaws.com/com.dfeddon.choomba/client/images/structures/multi-tenent.png");
    this.load.image("hq", "http://s3.amazonaws.com/com.dfeddon.choomba/client/images/structures/hq.png");
    this.load.image("factory", "http://s3.amazonaws.com/com.dfeddon.choomba/client/images/structures/factory.png");

    // iso
    this.load.crossOrigin = 'Anonymous';
    //load all necessary assets
    this.load.bitmapFont('font', 'https://dl.dropboxusercontent.com/s/z4riz6hymsiimam/font.png?dl=0', 'https://dl.dropboxusercontent.com/s/7caqsovjw5xelp0/font.xml?dl=0');
    this.load.image('greenTile', 'https://dl.dropboxusercontent.com/s/nxs4ptbuhrgzptx/green_tile.png?dl=0');
    this.load.image('redTile', 'https://dl.dropboxusercontent.com/s/zhk68fq5z0c70db/red_tile.png?dl=0');
    this.load.image('heroTile', 'https://dl.dropboxusercontent.com/s/8b5zkz9nhhx3a2i/hero_tile.png?dl=0');
    this.load.image('heroShadow', 'https://dl.dropboxusercontent.com/s/sq6deec9ddm2635/ball_shadow.png?dl=0');
    this.load.image('floor', 'https://dl.dropboxusercontent.com/s/h5n5usz8ejjlcxk/floor.png?dl=0');
    this.load.image('wall', 'https://dl.dropboxusercontent.com/s/uhugfdq1xcwbm91/block.png?dl=0');
    this.load.image('ball', 'https://dl.dropboxusercontent.com/s/pf574jtx7tlmkj6/ball.png?dl=0');

    // complete
    this.load.onLoadComplete.add(this.imageLoadComplete, this);
    //  Advanced profiling, including the fps rate, fps min/max, suggestedFps and msMin/msMax are updated
    this.game.time.advancedTiming = true;

    this.globals.crewController = new CrewContentController();
  }

  imageLoadComplete() {
    console.log("* image load complete");
    // var image = this.game.cache.checkImageKey('foursquare');
  }

  create() {
    console.log("== LobbyState.create ==");

    // instantiate sector controller, not view
    this.lobbyController = new LobbyController(this.game, this).create();
  }

  update() {
    // console.log("* update");
  }

  render() {
    // this.game.debug.cameraInfo(this.game.camera, window.innerWidth - 350, window.innerHeight - 150);
    this.game.debug.text('FPS: ' + this.game.time.fps || 'FPS: --', 40, 40, "#00ff00");
  }

  shutdown() {
    this.game.world.removeAll();
  }
}