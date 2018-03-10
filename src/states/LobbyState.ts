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
import { SectorView } from "../views/SectorView";

export default class LobbyState extends Phaser.State {
  charDragSource: any;
  charDragTarget: any;
  glob: number = 0;
  doc: any = document;
  // public sc: SocketClusterService;
  sc: SocketClusterService = SocketClusterService.getInstance();
  currentChannel: any;
  // player id stub
  player: string;
  selectedIncident: IncidentVO;
  lobbyContentController: LobbyContentController = new LobbyContentController();
  globals: Globals = Globals.getInstance();
  sectorView: Phaser.Sprite;

  // fnc
  combatBegin: any;

  preload() {
    console.log("== LobbyState.preload ==");

    this.globals.crewController = new CrewContentController();
    //this.sectorGroup = new SectorView(this.game, this.game.stage, "sectorGroup", true);
    this.sectorView = new SectorView(this.game, 0, 0);//, "sectorView");
  }

  // sddd() {
  //   console.log("HIIHJPOIJ:LKJ");
  // }

  create() {
    console.log("== LobbyState.create ==");

    var __this = this;
    // this.game.paused = false;
    // set bg color
    this.game.stage.backgroundColor = "#000000";
    // size game canvas
    this.game.scale.setGameSize(window.innerWidth, window.innerHeight);//h * 2);
    // set game bounds
    // this.game.world.setBounds(0, 0, 2000, window.innerHeight);
    // console.log('*****', this.game.world);
    // start arcade physics
    // this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // add sector
    // var sector: Phaser.Sprite = this.game.add.sprite(0, 0, this.sectorView.key);//this.sectorGroup = new SectorView.addBlocks();
    // this.sectorView.created();
    // spr.inputEnabled = true;
    // spr.events.onInputDown.add(function() {console.log("HIIHIHIH")}, this);
    // this.sectorGroup.inputEnabled = true;
    // this.sectorGroup.events.onInputDown.add(this.scdd, this);

    // this.game.state.start("NavigationState", true, false);
    // this.sc = SocketClusterService.getInstance();
    this.player = this.game.rnd.integerInRange(1000, 9000).toString();
    // console.log("* player id", this.player);
    this.doRun();
    // console.log("***", NameGenerator);
    // this.sc = SocketClusterService.getInstance();
    // console.log("cluster", this.sc);

    //////////////////////////////////////////////
    // tab content manager
    //////////////////////////////////////////////
    let pulseTab: HTMLElement = document.getElementById("tabPulse");
    let crewTab: HTMLElement = document.getElementById("tabCrew");
    let territoryTab: HTMLElement = document.getElementById("tabTerritory");
    let bizTab: HTMLElement = document.getElementById("tabBiz");
    let directivesTab: HTMLElement = document.getElementById("tabDirectives");
    let currentView: HTMLElement = document.getElementById("section-pulse");

    let tabHandler = function(e: Event) {
      // console.log("tab clicked", e.srcElement.id);
      __this.lobbyContentController.addContent(e.srcElement.id);
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

        item.addEventListener("click", function(e) {
          Globals.getInstance().crewController.clickHandler(e);
        });
      } // end for loop */
    }
  }

  update() {
    // console.log("* update");
  }

  shutdown() {
    this.game.world.removeAll();
  }

  dragStart(e: any) {
    console.log("dragstart");
  }

  doRun() {
    console.log("== LobbyState.doRun ==");
    var _this = this;

    //////////////////////////////////////////////
    // open global incidents channel
    //////////////////////////////////////////////
    this.sc.startGlobalChannels();

    // pause render loop
    // this.game.paused = true;//lockRender = true;

    //////////////////////////////////////////////
    // hide game view
    //////////////////////////////////////////////
    document.getElementById("gameView").style.display = "grid";

    //////////////////////////////////////////////
    // show lobby UI
    //////////////////////////////////////////////
    var lobbyStateHtml = document.getElementById("lobbyState");
    lobbyStateHtml.style.display = "grid";
    lobbyStateHtml.addEventListener("click", function(e) {
      console.log("* lobbyStateHTML clicked *", e.clientY, lobbyStateHtml.clientHeight);
      if (e.clientY > 1000)//lobbyStateHtml.clientHeight > 1000)
        lobbyStateHtml.style.height = "50%";
      else lobbyStateHtml.style.height = "100%";
    });

    //////////////////////////////////////////////
    // listen for pulse click event (stub)
    //////////////////////////////////////////////
    this.doc.getElementById('pulseClicker').onclick = function(e: MouseEvent) {
      console.log("* onclick", e.target);
      console.log("* player", _this.player);

      // TODO: send custom incident socket vo
      // create incidentVO
      var obj: object = {
        id: NumberHelper.UIDGenerator(),
        handle: "Cipher's Incident",
        description: "Tunnelling down into the grime of BAMA Sprawl...",
        entity: Globals.getInstance().player.entity.id,
        property: 1
      };
      // save it to dynamoDB?
      AWSService.getInstance().dynamoose.create(new IncidentsSchema(), obj, function(err: any, item: any) {
        if (err) return console.log(err);
        else return _this.incidentCreatedHandler(item);// console.log(item);
      });
    }
    
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    this.doc.pulseItemHandler = function(e: any) {
      // user elected to JOIN an extant incident (if successful, global event by id should be disabled)
      console.log("pulseItemHandler", e.getAttribute('data-uid'));
      var incident = JSON.parse(e.getAttribute('data-uid'));
      console.log("* incident", incident, incident._uid);

      // store incident, then send with combatBegin fnc
      _this.selectedIncident = new IncidentVO(incident);
      // TODO: Assign attack/defense characters to incident
      console.log("* assign", _this.selectedIncident);

      // join incident
      _this.sc.joinChannel(incident.channel);
    }

    //////////////////////////////////////////////
    //////////////////////////////////////////////
    this.combatBegin = function(combatBeginData: any) { //incident: IncidentVO) {
      console.log("== LobbyState.combatBegin ==", combatBeginData, this.selectedIncident);
      console.log("* is instigator?", this.selectedIncident.entity, Globals.getInstance().player.entity.id);
      var opponent: number[];
      if (this.selectedIncident.entity === Globals.getInstance().player.entity.id) {
        opponent = combatBeginData.challenger;
      } else opponent = combatBeginData.owner;
      // hide lobby UI
      document.getElementById("lobbyState").style.display = "none";
      // show game canvas
      document.getElementById("gameView").style.display = "grid";
      // un-pause game
      this.game.paused = false;
      // switch to NavigationState
      // _this.game.state.states.NavigationState.doRun();

      // update models
      // incident
      // crew
      // defending crew (if combat)

      // now, start state (key, clearWorld, clearCache, param)
      _this.game.state.start("NavigationState", true, false, { i: this.selectedIncident, o: opponent });
    }
  
    //////////////////////////////////////////////
    // drag and drop crew members
    //////////////////////////////////////////////
    document.ondragstart = function(e) {
      console.log("ondragstart", e.target);
      let img: HTMLImageElement = e.target as HTMLImageElement;
      console.log(img);
      // only allow dragging of extant slots
      if (!img.getAttribute(LobbyDropper.CHARACTER_ID_ATTRIBUTE)) {
        console.log("* empty slot");
        if (e.stopPropagation)
          e.stopPropagation();
        if (e.preventDefault)
          e.preventDefault();
      } else {
        console.log("* valid image");
      }
      _this.charDragSource = img;
      e.stopImmediatePropagation();
    };
    document.ondragover = function(e) {
      // console.log("ondragover", e);
      e.preventDefault();
    };
    document.ondragenter = function(e) {
      console.log("ondragenter");
    }
    document.ondragleave = function(e) {
      console.log("ondragleave");
    }
    // ... and drop
    document.ondrop = function(e) {
      console.log("* ondrop", e);
      if (e.stopPropagation)
        e.stopPropagation();
      if (e.preventDefault)
        e.preventDefault();
      let targ = e.target as any;
      let src = _this.charDragSource;

      // handle drop logic in LobbyDropper class
      LobbyDropper.dropped(src, targ);      
    };

    //////////////////////////////////////////////
    // touch events
    //////////////////////////////////////////////
    document.ontouchstart = function(e) {
      var i = e.target as any;
      console.log("ontouchstart", i.id);
      e.stopImmediatePropagation();
    };
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

  //////////////////////////////////////////////
  // add incident
  //////////////////////////////////////////////
	addIncident(vo: any) {
    console.log("* adding pulse item", vo);
    // vo: { [f]: , [t]ype: , [i]d: , [o]wner: }
    
    // don't add incidents created by *me*
    console.log(vo.o, this.player);
    if (vo.o === this.player) {
      return console.log("++ incident creator is ME!");
    }
    console.log("* id", vo.i, typeof(vo.i));
    // get incident from db by id
    AWSService.getInstance().dynamoose.findById(new IncidentsSchema(), vo.i, function(err: any, item: any) {
      if (err) return console.log(err);
      
      console.log("## got incident via db " + JSON.stringify(item), "color:lime");
    // });
      // clone wrapper
      var wrapper: any = document.getElementById("items-pulse-wrapper").cloneNode(true);
      var pulse: any = document.getElementById("pulse-grid");
      // insert item
      pulse.insertAdjacentElement("afterbegin", wrapper);
      // update labels
      var handle: any = document.getElementById("pulse-item-label");  
      var desc: any = document.getElementById("pulse-item-description");
      handle.innerText = item.handle;
      desc.innerText = item.description;
      // assign channel to vo
      item.channel = vo.i;
      // assign vo data to div
      wrapper.setAttribute("data-uid", JSON.stringify(item));//.toString());// = vo;
    });
  }
  
  //////////////////////////////////////////////
  // incident created
  //////////////////////////////////////////////
  incidentCreatedHandler(i: IncidentVO) {
    console.log("* incident created handler", i);
    // var i: IncidentVO = (data as any).incidents[0];
    var incidentVO = new IncidentVO(i);
    console.log("* derek", incidentVO);
    this.selectedIncident = incidentVO;
    // console.log("* net", new Phaser.Net(_this.game).getQueryString("player"));
    // save it to dynamoDB?
    // send it below (or just incident id, text, and owner)
    // perhaps channel name is same as incident id?
    this.sc.createChannel(i.id, this.player);
  }
	

	renameDescendantsOfNode = function(node: any, suffix: number) {
		for (var i = 0; i < node.childNodes.length; i++) {
			var child = node.childNodes[i];
			if (child.id) // require id?
			{
				this.renameDescendantsOfNode(child, suffix);
				child.setAttribute("id", child.id + "_" + suffix);
				console.log("* child", child);
			}
		}
		return node;
	}

}