import { IncidentVO } from "../models/IncidentsVO";
import { NameGenerator } from "fantastical";
import { EntityVO } from "../models/EntitiesVO";
import { CrewVO } from "../models/CrewsVO";
import { CharacterDataVO } from "../models/CharacterDataVO";
import * as data from "../helpers/stubJson.json";
import { SocketClusterService } from "../services/SocketClusterService";
import { AWSService } from "../services/AWSService";
import { IncidentsSchema } from "../services/Schemas/IncidentsSchema";

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

  // fnc
  combatBegin: any;

  preload() {
    console.log("== LobbyState.preload ==");
  }

  create() {
    console.log("== LobbyState.create ==");
    // this.game.state.start("NavigationState", true, false);
    // this.sc = SocketClusterService.getInstance();
    this.player = this.game.rnd.integerInRange(1000, 9000).toString();
    console.log("* player id", this.player);
    this.doRun();
    console.log("***", NameGenerator);
    // this.sc = SocketClusterService.getInstance();
    // console.log("cluster", this.sc);
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

    // open global incidents channel
    this.sc.startGlobalChannels();

    // pause render loop
    // this.game.paused = true;//lockRender = true;

    // hide game view
    document.getElementById("gameView").style.display = "none";

    // show lobby UI
    document.getElementById("lobbyState").style.display = "grid";

    // listen for pulse click event (stub)
    this.doc.getElementById('pulseClicker').onclick = function(e: MouseEvent) {
      console.log("* onclick", e.target);
      console.log("* player", _this.player);

      // TODO: send custom incident socket vo
      // create incidentVO
      var obj: object = { 
        id: AWSService.getInstance().dynamoose.UIDGenerator(), 
        name: "Cipher's Incident", 
        description: "Tunnelling down into the grim of BAMA Sprawl..."
      };
      // save it to dynamoDB?
      AWSService.getInstance().dynamoose.create(new IncidentsSchema(), obj, function(err: any, item: any) {
        if (err) return console.log(err);
        else return _this.incidentCreatedHandler(item);// console.log(item);
      });
      /*
      var i = (data as any).incidents[0];
      var incidentVO = new IncidentVO(i);
      console.log("* derek", incidentVO);
      // console.log("* net", new Phaser.Net(_this.game).getQueryString("player"));
      // save it to dynamoDB?
      // send it below (or just incident id, text, and owner)
      // perhaps channel name is same as incident id?
      _this.sc.createChannel("1122334455", _this.player);
      */
      // return;
      // var i = e.target as any;
      // console.log(i.id);

      // // stub: incident participants
      // console.log("* vo data", data);
      // // var paticipants: CrewVO[];
      // // var localCrew = new CrewVO();
      // // var remoteCrew = new CrewVO();
      
      // // var attackers: CharacterDataVO[] = [
      // //   new CharacterDataVO("steampunk02", "Cat 1"), 
      // //   new CharacterDataVO("steampunk01", "Man 1"),
      // //   new CharacterDataVO("steampunk01", "Steampunk 1"),
      // //   new CharacterDataVO("`robot01`", "Robot 1")
      // // ];
      // // var defenders: CharacterDataVO[] = [
      // //   new CharacterDataVO("steampunk02", "Cat 1"), 
      // //   new CharacterDataVO("steampunk01", "Man 1"),
      // //   new CharacterDataVO("steampunk02", "Steampunk 1"),
      // //   new CharacterDataVO("robot01", "Robot 1")
      // // ];

      // switch(i.id) {
      //   case "pulseClicker":
      //     console.log("add pulse item");
      //     _this.glob++;
      //     // create incident vo
      //     var incident: IncidentVO = new IncidentVO();
      //     if (_this.glob === 1) {
      //       incident.name = "Infiltration " + _this.glob;
      //       incident.description = "Hacking into facility...";
      //       incident.type = IncidentVO.INCIDENT_TYPE_SPAWN;
      //       incident.entity = new EntityVO();
      //     }
      //     else if (_this.glob === 2) {
      //       incident.name = "Turf War " + _this.glob;
      //       incident.description = "Sensors alerted near Sinjun Corps red tower just outside Frisco Sprawl. Too-tall Redline Hackers suspected.";
      //       incident.type = IncidentVO.INCIDENT_TYPE_DEFEND;
      //       incident.entity = new EntityVO();
      //     }
      //     // incident.entity.crew

      //     // incident.structure = 0;
      //     _this.addIncident(incident);
      //   break;
      // }
    }
    
    this.doc.pulseItemHandler = function(e: any) {
      // user elected to JOIN an extant incident (if successful, global event by id should be disabled)
      console.log("pulseItemHandler", e.getAttribute('data-uid'));
      var incident = JSON.parse(e.getAttribute('data-uid'));
      console.log("* incident", incident, incident._uid);

      // store incident, then send with combatBegin fnc
      _this.selectedIncident = new IncidentVO(incident);
      console.log("* assign", _this.selectedIncident);

      // join incident
      _this.sc.joinChannel(incident.channel);
    }

    this.combatBegin = function(incident: IncidentVO) {
      console.log("== LobbyState.combatBegin ==", incident, this.selectedIncident, _this.selectedIncident);
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
      _this.game.state.start("NavigationState", true, false, this.selectedIncident);
    }
  
    // drag and drop
    document.ondragstart = function(e) {
      console.log("ondragstart", e.target);
      var i = e.target as any;
      _this.charDragSource = i.id;
      e.stopImmediatePropagation();
      // e.dataTransfer.setDragImage()
    };
    document.ondragover = function(e) {
      // console.log("ondragover", e);
      e.preventDefault();
    };
    document.ondrop = function(e) {
      var i = e.target as any;
      _this.charDragTarget = i.id;
      console.log("ondrop event", i.id);
      console.log(
        "* dropping",
        _this.charDragSource,
        "onto",
        _this.charDragTarget
      );
      e.stopImmediatePropagation();
    };

    // touch events
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
      var pulse = document.getElementById("pulse-grid");
      // insert item
      pulse.insertAdjacentElement("afterbegin", wrapper);
      // update labels
      var name: any = document.getElementById("pulse-item-label");
      var desc: any = document.getElementById("pulse-item-description");
      name.innerText = item.name;
      desc.innerText = item.description;
      // assign channel to vo
      item.channel = vo.i;
      // assign vo data to div
      wrapper.setAttribute("data-uid", JSON.stringify(item));//.toString());// = vo;
    });
  }
  
  incidentCreatedHandler(i: IncidentVO) {
    console.log("* incident created handler", i);
    // var i: IncidentVO = (data as any).incidents[0];
    var incidentVO = new IncidentVO(i);
    console.log("* derek", incidentVO);
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