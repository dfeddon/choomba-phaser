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
  // charDragSource: any;
  // charDragTarget: any;
  // glob: number = 0;
  // doc: any = document;
  // // public sc: SocketClusterService;
  // // sc: SocketClusterService = SocketClusterService.getInstance();
  // currentChannel: any;
  // // player id stub
  // player: string;
  // selectedIncident: IncidentVO;
  // lobbyContentController: LobbyContentController = new LobbyContentController();
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
    this.load.onLoadComplete.add(this.imageLoadComplete, this);
    //  Advanced profiling, including the fps rate, fps min/max, suggestedFps and msMin/msMax are updated
    this.game.time.advancedTiming = true;

    this.globals.crewController = new CrewContentController();
    //this.sectorGroup = new SectorView(this.game, this.game.stage, "sectorGroup", true);
  }

  imageLoadComplete() {
    console.log("* image load complete");
    // var image = this.game.cache.checkImageKey('foursquare');
    // console.log("* image in cache", image);
  }

  create() {
    console.log("== LobbyState.create ==");

    // instantiate sector controller, not view
    this.lobbyController = new LobbyController(this.game, this).create();
    
    // console.log("* player id", this.player);
    this.doRun();
    // console.log("***", NameGenerator);
    // this.sc = SocketClusterService.getInstance();
    // console.log("cluster", this.sc);
    /*
    //////////////////////////////////////////////
    // tab content manager
    //////////////////////////////////////////////
    let pulseTab: HTMLElement = document.getElementById("tabPulse");
    let crewTab: HTMLElement = document.getElementById("tabCrew");
    let territoryTab: HTMLElement = document.getElementById("tabTerritory");
    let bizTab: HTMLElement = document.getElementById("tabBiz");
    let directivesTab: HTMLElement = document.getElementById("tabDirectives");
    let currentView: HTMLElement = document.getElementById("section-pulse");

    let tabHandler = (e: Event) => {
      // console.log("tab clicked", e.srcElement.id);
      this.lobbyContentController.addContent(e.srcElement.id);
    };
    pulseTab.addEventListener("click", tabHandler);
    crewTab.addEventListener("click", tabHandler);
    territoryTab.addEventListener("click", tabHandler);
    bizTab.addEventListener("click", tabHandler);
    directivesTab.addEventListener("click", tabHandler);

    //////////////////////////////////////////////
    // import html handlers
    //////////////////////////////////////////////
    function handleLoad(e: any) {
      console.log('Loaded import: ' + e.target.href);
    }
    function handleError(e: any) {
      console.log('Error loading import: ' + e.target.href);
    }

    //////////////////////////////////////////////
    // populate character pool grid with freelancers (position === 0)
    //////////////////////////////////////////////
    console.log("====== players", Globals.getInstance().player);//, Globals.getInstance().player.entity.characterPool.length);
    let item: HTMLImageElement;
    let name: HTMLElement;
    let slot: number = 1;
  
    for (let i = 0; i < Globals.getInstance().player.entity.characterPool.length; i++) {
      console.log("* character type:", Globals.getInstance().player.entity.characterPool[i].role);
      // only list characters in crew
      if (Globals.getInstance().player.entity.characterPool[i].position !== 0) {
        item = document.getElementById('crew-portrait-' + Globals.getInstance().player.entity.characterPool[i].position.toString()) as HTMLImageElement;
        item.setAttribute(LobbyDropper.CHARACTER_ID_ATTRIBUTE, Globals.getInstance().player.entity.characterPool[i].id.toString());
        item.src = 'http://s3.amazonaws.com/com.dfeddon.choomba/client/images/portraits/portrait_' + Globals.getInstance().player.entity.characterPool[i].role.toString() + '.png';
        item.width = 75;
        item.height = 100;
        name = document.getElementById('crew-name-' + Globals.getInstance().player.entity.characterPool[i].position.toString()) as HTMLElement;
        name.innerText = Globals.getInstance().player.entity.characterPool[i].handle;

        item.addEventListener("click", (e) => {
          Globals.getInstance().crewController.clickHandler(e);
        });
      } // end for loop
    } */
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

  doRun() {
    console.log("== LobbyState.doRun ==");
    // var _this = this;

    // //////////////////////////////////////////////
    // // open global incidents channel
    // //////////////////////////////////////////////
    // this.sc.startGlobalChannels();

    // pause render loop
    // this.game.paused = true;//lockRender = true;

    // //////////////////////////////////////////////
    // // hide game view
    // //////////////////////////////////////////////
    // document.getElementById("gameView").style.display = "grid";

    // //////////////////////////////////////////////
    // // show lobby UI
    // //////////////////////////////////////////////
    // var lobbyStateHtml = document.getElementById("lobbyState");
    // lobbyStateHtml.style.display = "grid";
    // lobbyStateHtml.addEventListener("click", (e) => {
    //   console.log("* lobbyStateHTML clicked *", e.clientY, lobbyStateHtml.clientHeight);
    //   if (e.clientY > 1000)//lobbyStateHtml.clientHeight > 1000)
    //     lobbyStateHtml.style.height = "10%";
    //   else lobbyStateHtml.style.height = "10%";//"100%";
    // });

    // //////////////////////////////////////////////
    // // listen for pulse click event (stub)
    // //////////////////////////////////////////////
    // this.doc.getElementById('pulseClicker').onclick = (e: MouseEvent) => {
    //   console.log("* onclick", e.target);
    //   console.log("* player", this.player);

    //   // TODO: send custom incident socket vo
    //   // create incidentVO
    //   var obj: object = {
    //     id: NumberHelper.UIDGenerator(),
    //     handle: "Cipher's Incident",
    //     description: "Tunnelling down into the grime of BAMA Sprawl...",
    //     entity: Globals.getInstance().player.entity.id,
    //     property: 1
    //   };
    //   // save it to dynamoDB?
    //   AWSService.getInstance().dynamoose.create(new IncidentsSchema(), obj, (err: any, item: any) => {
    //     if (err) return console.log(err);
    //     else return this.incidentCreatedHandler(item);// console.log(item);
    //   });
    // }
    
    // //////////////////////////////////////////////
    // //////////////////////////////////////////////
    // this.doc.pulseItemHandler = (e: any) => {
    //   // user elected to JOIN an extant incident (if successful, global event by id should be disabled)
    //   console.log("pulseItemHandler", e.getAttribute('data-uid'));
    //   var incident = JSON.parse(e.getAttribute('data-uid'));
    //   console.log("* incident", incident, incident._uid);

    //   // store incident, then send with combatBegin fnc
    //   this.selectedIncident = new IncidentVO(incident);
    //   // TODO: Assign attack/defense characters to incident
    //   console.log("* assign", this.selectedIncident);

    //   // join incident
    //   this.sc.joinChannel(incident.channel);
    // }

    // //////////////////////////////////////////////
    // //////////////////////////////////////////////
    // this.combatBegin = (combatBeginData: any) => { //incident: IncidentVO) {
    //   console.log("== LobbyState.combatBegin ==", combatBeginData, this.selectedIncident);
    //   console.log("* is instigator?", this.selectedIncident.entity, Globals.getInstance().player.entity.id);
    //   var opponent: number[];
    //   if (this.selectedIncident.entity.id === Globals.getInstance().player.entity.id) {
    //     opponent = combatBeginData.challenger;
    //   } else opponent = combatBeginData.owner;
    //   // hide lobby UI
    //   document.getElementById("lobbyState").style.display = "none";
    //   // show game canvas
    //   document.getElementById("gameView").style.display = "grid";
    //   // un-pause game
    //   this.game.paused = false;
    //   // switch to NavigationState
    //   // _this.game.state.states.NavigationState.doRun();

    //   // update models
    //   // incident
    //   // crew
    //   // defending crew (if combat)

    //   // now, start state (key, clearWorld, clearCache, param)
    //   this.game.state.start("NavigationState", true, false, { i: this.selectedIncident, o: opponent });
    // }
  
    // //////////////////////////////////////////////
    // // drag and drop crew members
    // //////////////////////////////////////////////
    // document.ondragstart = (e) => {
    //   console.log("ondragstart", e.target);
    //   let img: HTMLImageElement = e.target as HTMLImageElement;
    //   console.log(img);
    //   // only allow dragging of extant slots
    //   if (!img.getAttribute(LobbyDropper.CHARACTER_ID_ATTRIBUTE)) {
    //     console.log("* empty slot");
    //     if (e.stopPropagation)
    //       e.stopPropagation();
    //     if (e.preventDefault)
    //       e.preventDefault();
    //   } else {
    //     console.log("* valid image");
    //   }
    //   this.charDragSource = img;
    //   e.stopImmediatePropagation();
    // };
    // document.ondragover = (e) => {
    //   // console.log("ondragover", e);
    //   e.preventDefault();
    // };
    // document.ondragenter = (e) => {
    //   console.log("ondragenter");
    // }
    // document.ondragleave = (e) => {
    //   console.log("ondragleave");
    // }
    // // ... and drop
    // document.ondrop = (e) => {
    //   console.log("* ondrop", e);
    //   if (e.stopPropagation)
    //     e.stopPropagation();
    //   if (e.preventDefault)
    //     e.preventDefault();
    //   let targ = e.target as any;
    //   let src = this.charDragSource;

    //   // handle drop logic in LobbyDropper class
    //   LobbyDropper.dropped(src, targ);      
    // };

    // //////////////////////////////////////////////
    // // touch events
    // //////////////////////////////////////////////
    // document.ontouchstart = (e) => {
    //   var i = e.target as any;
    //   console.log("ontouchstart", i.id);
    //   e.stopImmediatePropagation();
    // };
  } // end doRun()

  	// pulseItemHandler() {
    //     console.log("* pulse clicked");
    //     // hide lobby UI
    //     document.getElementById("lobbyState").style.display = "none";
    //     // show game canvas
    //     document.getElementById("gameView").style.display = "grid";
    //     // un-pause game
    //     this.game.paused = false;
    //     // switch to NavigationState
    //     this.game.state.states.NavigationState.doRun();
	// };

	// buildIncidentItem(vo: IncidentVO) {

	// }

  // //////////////////////////////////////////////
  // // add incident
  // //////////////////////////////////////////////
	// addIncident(vo: any) {
  //   console.log("* adding pulse item", vo);
  //   // vo: { [f]: , [t]ype: , [i]d: , [o]wner: }
    
  //   // don't add incidents created by *me*
  //   console.log(vo.o, this.player);
  //   if (vo.o === this.player) {
  //     return console.log("++ incident creator is ME!");
  //   }
  //   console.log("* id", vo.i, typeof(vo.i));
  //   // get incident from db by id
  //   AWSService.getInstance().dynamoose.findById(new IncidentsSchema(), vo.i, (err: any, item: any) => {
  //     if (err) return console.log(err);
      
  //     console.log("## got incident via db " + JSON.stringify(item), "color:lime");
  //   // });
  //     // clone wrapper
  //     var wrapper: any = document.getElementById("items-pulse-wrapper").cloneNode(true);
  //     var pulse: any = document.getElementById("pulse-grid");
  //     // insert item
  //     pulse.insertAdjacentElement("afterbegin", wrapper);
  //     // update labels
  //     var handle: any = document.getElementById("pulse-item-label");  
  //     var desc: any = document.getElementById("pulse-item-description");
  //     handle.innerText = item.handle;
  //     desc.innerText = item.description;
  //     // assign channel to vo
  //     item.channel = vo.i;
  //     // assign vo data to div
  //     wrapper.setAttribute("data-uid", JSON.stringify(item));//.toString());// = vo;
  //   });
  // }
  
  // //////////////////////////////////////////////
  // // incident created
  // //////////////////////////////////////////////
  // incidentCreatedHandler(i: IncidentVO) {
  //   console.log("* incident created handler", i);
  //   // var i: IncidentVO = (data as any).incidents[0];
  //   var incidentVO = new IncidentVO(i);
  //   console.log("* derek", incidentVO);
  //   this.selectedIncident = incidentVO;
  //   // console.log("* net", new Phaser.Net(_this.game).getQueryString("player"));
  //   // save it to dynamoDB?
  //   // send it below (or just incident id, text, and owner)
  //   // perhaps channel name is same as incident id?
  //   this.sc.createChannel(i.id, this.player);
  // }
	

	// renameDescendantsOfNode = (node: any, suffix: number) => {
	// 	for (var i = 0; i < node.childNodes.length; i++) {
	// 		var child = node.childNodes[i];
	// 		if (child.id) // require id?
	// 		{
	// 			this.renameDescendantsOfNode(child, suffix);
	// 			child.setAttribute("id", child.id + "_" + suffix);
	// 			console.log("* child", child);
	// 		}
	// 	}
	// 	return node;
	// }

}