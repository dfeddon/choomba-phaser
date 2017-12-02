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
// import { AWSIoTService } from './services/AWSIoTService';

export default class App extends Phaser.Game {
  // game: Phaser.Game;
  // man1: Phaser.Sprite;
  // man2: Phaser.Sprite;
  // zomb1: Phaser.Sprite;
  // cat1: Phaser.Sprite;
  // cute1: Phaser.Sprite;

  constructor() {
    console.log("* Choomba");
    console.log("* default entity name:", NameGenerator.parties.guild());

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
      super(
      window.innerWidth * window.devicePixelRatio,// - 15,
      window.innerHeight * window.devicePixelRatio,// / 1.6,
      Phaser.AUTO,
      "content", null
      // {
      //   preload: this.preload,
      //   create: this.create,
      //   update: this.update,
      //   render: this.render
      // }
    );

    // start AWS server (Singleton)
    let AWS = AWSService.getInstance();
    AWS.start();

    // init dynamoose
    // AWS.dynamoose.setGame(this);

    // start socketCluster
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
    // get player
    AWS.dynamoose.findById(new PlayersSchema(), playerStubId, function (err: any, player: any) {
      if (err) return console.log(err);
      console.log("* player", player);
      if (player) {
        console.log("* getting owner from entity", player.entity);
        // get entity
        AWS.dynamoose.findById(new EntitiesSchema(), player.entity, function (err: any, entity: any) {
          if (err) return console.log(err);
          console.log("* len", entity.freelancers);
          AWS.dynamoose.getCharactersByArray(entity.freelancers);
          __this.state.start("BootState");
        });
      }
      else console.log("!! no player found");
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