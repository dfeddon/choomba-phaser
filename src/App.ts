import './public/css/index.scss';
import BootState from "./states/BootState";
import PreloaderState from "./states/PreloaderState";
import SplashState from "./states/SplashState";
import NavigationState from "./states/NavigationState";
import LobbyState from "./states/LobbyState";
import ResultsState from "./states/ResultsState";
import { AWSService } from './services/AWSService';
import * as NameGenerator from "fantastical";
import { AjaxHelper } from './helpers/AjaxHelper';
import { SocketClusterService } from './services/SocketClusterService';
import { PlayersSchema } from './services/Schemas/PlayersSchema';
import { EntitiesSchema } from './services/Schemas/EntitiesSchema';
import { CharacterVO } from './models/CharactersVO';
import { NumberHelper } from './helpers/NumberHelper';
import { CharactersSchema } from './services/Schemas/CharactersSchema';
import { DynamooseService } from './services/DynamooseService';
import { PlayerService } from './services/PlayerService';
// import { AWSIoTService } from './services/AWSIoTService';
import { Globals } from './services/Globals';
import { PlayerVO } from './models/PlayersVO';
import { EntityVO } from './models/EntitiesVO';
import { LobbyController } from './controllers/LobbyController';
import { SectorService } from './services/SectorService';

// import Vue from "vue";
// import TerritoryVue from "../public/vue/TerritoryView.vue";
import BootstrapVue from "bootstrap-vue";
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

export default class App extends Phaser.Game {
  // game: Phaser.Game;
  // man1: Phaser.Sprite;
  // man2: Phaser.Sprite;
  // zomb1: Phaser.Sprite;
  // cat1: Phaser.Sprite;
  // cute1: Phaser.Sprite;
  // Globals.getInstance().player: PlayerVO;

  constructor() {
    console.log("* Choomba");
    for (var i = 0; i < 10; i++) {
      console.log("* default entity name (guild):", NameGenerator.parties.guild());
      console.log("* default entity name (mystic order):", NameGenerator.parties.mysticOrder());
      console.log("* default entity name (military unit):", NameGenerator.parties.militaryUnit());
      console.log("* location (tavern)", NameGenerator.places.tavern());
    }

    // var apiGateway: string = "https://9l3uls9g3k.execute-api.us-east-1.amazonaws.com";
    // var url: string = apiGateway + "/dev/iot/keys";
    // url = "https://9l3uls9g3k.execute-api.us-east-1.amazonaws.com/dev/iot/keys";

    // var ajax = new AjaxHelper().ajax(url,AjaxHelper.HTTP_METHOD_GET,
    //   function(err: any, res: any) {
    //     if (err) {
    //       return console.log("error:", err);
    //     }
    //     console.log("* got ajax", res);
    //     // connect to iot
    //     // IoT.connect("derek", res.iotEndpoint, res.region, res.awsAccessKey, res.awsSecretAccessKey, res.sessionToken);
    //   }
    // );
    // socketcluster
    // var aws = 
    // let gen: any = NameGenerator.generator('diablo', 'demons', 10, 0);
    // console.log(gen);//('diablo', 'demons', 10, 0));
    // this.game = new Phaser.Game(
    let w: number = window.innerWidth * window.devicePixelRatio;
    let h: number = window.innerHeight * window.devicePixelRatio;
    super(
      w,//window.innerWidth * window.devicePixelRatio,
      h,//window.innerHeight * window.devicePixelRatio,
      Phaser.WEBGL_MULTI,
      "content", null
      // {
      //   preload: this.preload,
      //   create: this.create,
      //   update: this.update,
      //   render: this.render
      // }
    );

    // device type
    if (this.device.initialized) {
      if (this.device.touch) {
        Globals.getInstance().isMobile = true;
        Globals.getInstance().isApp = this.device.webApp;
        if (this.device.iOS) {
          Globals.getInstance().isIos = true;
          if (this.device.iPad) Globals.getInstance().isTablet = true;
          else if (this.device.iPhone) Globals.getInstance().isIphone = true;
        }
        else if (this.device.android) Globals.getInstance().isDroid = true;
      }
      // var width = window.innerWidth * window.devicePixelRatio; 
      // var height = window.innerHeight * window.devicePixelRatio;
  }

    console.log("* device", this.device);//this.device.iOS, this.device.iPad, this.device.linux);

    // let Globals.getInstance().player: PlayerVO = Globals.getInstance().player;

    // start AWS server (Singleton)
    let AWS = AWSService.getInstance();
    AWS.start();
    // return;

    // init dynamoose
    // AWS.dynamoose.setGame(this);

    // start socketCluster (assign user to sector id)
    SocketClusterService.getInstance().init(this);

    // stub user
    console.log("* net", new Phaser.Net(this).getQueryString("player"));

    // load states
    this.state.add("BootState", BootState, false);
    this.state.add("PreloaderState", PreloaderState, false);
    this.state.add("SplashState", SplashState, false);
    this.state.add("NavigationState", NavigationState, false);
    this.state.add("LobbyState", LobbyState, false);
    this.state.add("ResultsState", ResultsState, false);

    // start boot
    let __this = this;
    let playerStubId: number = parseInt(new Phaser.Net(this).getQueryString("player"));
    this.getPlayer(playerStubId);
    // this.generateNewSector();
  }

  getPlayer(id: number) {
    // get player
    new PlayerService().init(id, (err: any, result: any) => {
      if (err) console.error("Error: ", err);
      else {
        console.log("* got player", result);
        if (result.entity) {
          if (result.entity.blocksKnown.length > 0) {
            this.go();//__this.go();
          }
        }
      }
    });
  }

  go() {
    this.state.start("BootState");
  }

  generateNewSector() {
    new SectorService().createNewAndPopulate(function (err: any, result: any) {
      if (err) console.log("* error", JSON.stringify(err));
      else console.log("* success!");
    });
  }

  // preload() {
  //   console.log("== App.preload ==");
  // }

  // create() {
  //   console.log("== App.create ==");
  // }
}
/*
  preload() {
    console.log("== preload ==");
    this.game.load.crossOrigin = true;
    // "http://s3.amazonaws.com/com.dfeddon.choomba/spritesheets/boy1-idle.png";
    this.game.load.spritesheet(
      "uniqueKey",
      "../images/spritesheets/boy1-idle.png",
      132,
      185
    ); //132, 186); //, 10);
    this.game.load.spritesheet(
      "uniqueKey2",
      "../images/spritesheets/boy2-idle.png",
      132,
      185
    ); //132, 186); //, 10);
    // this.game.load.spritesheet(
    //   "uniqueKey3",
    //   "../images/spritesheets/zombie1-idle.png",
    //   172,
    //   182 // 186
    // ); //132, 186); //, 10);
    this.game.load.atlasJSONHash(
      "char01",
      "../images/spritesheets/char01.png",
      "../images/spritesheets/char01.json"
    );
    this.game.load.atlasJSONHash(
      "cutechar01",
      "../images/spritesheets/cutechar01.png",
      "../images/spritesheets/cutechar01.json"
    );
    this.game.load.atlasJSONHash(
      "zombie01",
      "../images/spritesheets/zombie01.png",
      "../images/spritesheets/zombie01.json"
    );
    this.game.load.atlasJSONHash(
      "catlvl01",
      "../images/spritesheets/catlvl01.png",
      "../images/spritesheets/catlvl01.json"
    );
  }
  create() {
    console.log("== create ==");
    // Stretch to fill
    // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    //  var text = "Hello World!";
    //  var style = { font: "65px Arial", fill: "#ff0000", align: "center" };
    //  this.game.add.text(0, 0, text, style);

    // this.man1 = this.game.add.sprite(0, 0, "uniqueKey", 0);
    // this.man1.animations.add("idle");
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
  update() {
    // console.log("t", time);
  }
  render() {
    // console.log("* render");
  }
}
*/
window.onload = () => {
  var game = new App();
};
//*/