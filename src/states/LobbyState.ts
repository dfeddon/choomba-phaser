import { IncidentVO } from "../models/IncidentsVO";
import { NameGenerator } from "fantastical";
import { EntityVO } from "../models/EntitiesVO";
import { CrewVO } from "../models/CrewsVO";
import { CharacterDataVO } from "../models/CharacterDataVO";
import * as data from "../helpers/stubJson.json";
import { SocketClusterService } from "../services/SocketClusterService";
import { AWSService } from "../services/AWSService";
import { IncidentsSchema } from "../services/Schemas/IncidentsSchema";
import { NumberHelper } from "../helpers/NumberHelper";
import { PlayerVO } from "../models/PlayersVO";
import { Globals } from "../services/Globals";

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

    // populate character pool grid with freelancers (position === 0)
    console.log("====== players", Globals.getInstance().player);//, Globals.getInstance().player.entity.characterPool.length);
    let item: HTMLImageElement;
    let name: HTMLElement;
    let slot: number = 1;
    for (let i = 0; i < Globals.getInstance().player.entity.characterPool.length; i++) {
      console.log("* character type:", Globals.getInstance().player.entity.characterPool[i].role);
      // populate character pool (position => 0)
      if (Globals.getInstance().player.entity.characterPool[i].position === 0) {
        item = document.getElementById('item-' + slot.toString() +'-img') as HTMLImageElement;
        item.setAttribute('charid', Globals.getInstance().player.entity.characterPool[i].id.toString());
        item.src = 'images/portrait_' + Globals.getInstance().player.entity.characterPool[i].role.toString() + '.png';
        item.width = 75;
        item.height = 100;
        slot++;
      }
      else { // character in crew!
        item = document.getElementById('crew-portrait-' + Globals.getInstance().player.entity.characterPool[i].position.toString()) as HTMLImageElement;
        item.src = 'images/portrait_' + Globals.getInstance().player.entity.characterPool[i].role.toString() + '.png';
        item.width = 75;
        item.height = 100;
        name = document.getElementById('crew-name-' + Globals.getInstance().player.entity.characterPool[i].position.toString()) as HTMLElement;
        name.innerText = Globals.getInstance().player.entity.characterPool[i].handle;
      }
    }
    // console.log('img1', item1, item1.src);
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
        id: NumberHelper.UIDGenerator(), 
        name: "Cipher's Incident", 
        description: "Tunnelling down into the grime of BAMA Sprawl..."
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
      // TODO: Assign attack/defense characters to incident
      console.log("* assign", _this.selectedIncident);

      // join incident
      _this.sc.joinChannel(incident.channel);
    }

    this.combatBegin = function() { //incident: IncidentVO) {
      console.log("== LobbyState.combatBegin ==", this.selectedIncident);
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
  
    // drag...
    document.ondragstart = function(e) {
      console.log("ondragstart", e.target);
      let img: HTMLImageElement = e.target as HTMLImageElement;
      console.log(img);
      // only allow dragging of extant slots
      if (!img.getAttribute('charid')) {
        console.log("* empty slot");
        if (e.stopPropagation)
          e.stopPropagation();
        if (e.preventDefault)
          e.preventDefault();
      } else {
        console.log("* valid image");
      }
      // var i = e.target as any;
      _this.charDragSource = img;//.id;
      e.stopImmediatePropagation();
      // e.dataTransfer.setDragImage()
    };
    document.ondragover = function(e) {
      // console.log("ondragover", e);
      e.preventDefault();
    };
    // ... and drop
    document.ondrop = function(e) {
      if (e.stopPropagation)
        e.stopPropagation();
      if (e.preventDefault)
        e.preventDefault();
      var i = e.target as any;
      _this.charDragTarget = i;//.id;
      console.log("ondrop event", i.id);
      console.log("* dropping", _this.charDragSource, "onto", _this.charDragTarget);
      // e.stopImmediatePropagation();

      // first, ensure drag source class is *pool-item-img* and drop targ class is *crew-portraits*
      console.log("*", _this.charDragSource.getAttribute('class'), _this.charDragTarget.getAttribute('class'));
      if (_this.charDragSource.getAttribute('class') != "pool-item-img" || _this.charDragTarget.getAttribute('class') != "crew-portraits") {
        return console.log("* invalid source/target!");
      }

      // if target is empty, add source and refresh pool
      if (!_this.charDragTarget.src) {
        console.log("* valid target has no image, set it!")
        _this.charDragTarget.setAttribute('src', _this.charDragSource.getAttribute('src'));
        _this.charDragTarget.setAttribute('charid', _this.charDragSource.getAttribute('charid'));
        // change character position to slot num
        // refresh pool
      } else { // otherwise, switch target and source
        console.log("* valid target has image, switch!");
      }
      
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
      var pulse: any = document.getElementById("pulse-grid");
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