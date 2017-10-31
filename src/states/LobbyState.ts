import { IncidentVO } from "../models/IncidentsVO";
import { NameGenerator } from "fantastical";
import { EntityVO } from "../models/EntitiesVO";
import { CrewVO } from "../models/CrewsVO";
import { CharacterDataVO } from "../models/CharacterDataVO";

export default class LobbyState extends Phaser.State {
  charDragSource: any;
  charDragTarget: any;
  glob: number = 0;
  doc: any = document;

  preload() {
    console.log("== LobbyState.preload ==");
  }

  create() {
    console.log("== LobbyState.create ==");
    // this.game.state.start("NavigationState", true, false);
    this.doRun();
    console.log("***", NameGenerator);
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

    // pause render loop
    // this.game.paused = true;//lockRender = true;

    // hide game view
    document.getElementById("gameView").style.display = "none";

    // show lobby UI
    document.getElementById("lobbyState").style.display = "grid";

    // listen for pulse click event (stub)
    this.doc.onclick = function(e: MouseEvent) {
      console.log("* onclick", e.target);
      var i = e.target as any;
      console.log(i.id);

      // stub: incident participants
      var paticipants: CrewVO[];
      var localCrew = new CrewVO();
      var remoteCrew = new CrewVO();
      
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

      switch(i.id) {
        case "pulseClicker":
          console.log("add pulse item");
          _this.glob++;
          // create incident vo
          var incident: IncidentVO = new IncidentVO();
          if (_this.glob === 1) {
            incident.name = "Infiltration " + _this.glob;
            incident.description = "Hacking into facility...";
            incident.type = IncidentVO.INCIDENT_TYPE_SPAWN;
            incident.entity = new EntityVO();
          }
          else if (_this.glob === 2) {
            incident.name = "Turf War " + _this.glob;
            incident.description = "Sensors alerted near Sinjun Corps red tower just outside Frisco Sprawl. Too-tall Redline Hackers suspected.";
            incident.type = IncidentVO.INCIDENT_TYPE_DEFEND;
            incident.entity = new EntityVO();
          }
          // incident.entity.crew

          // incident.structure = 0;
          _this.addIncident(incident);
        break;
      }
	  }
	
    this.doc.pulseItemHandler = function(e: any) {
      console.log("pulseItemHandler", e.getAttribute('data-uid'));
      var incident = JSON.parse(e.getAttribute('data-uid'));
      console.log("* incident", incident, incident._uid);
      // hide lobby UI
      document.getElementById("lobbyState").style.display = "none";
      // show game canvas
      document.getElementById("gameView").style.display = "grid";
      // un-pause game
      _this.game.paused = false;
      // switch to NavigationState
      // _this.game.state.states.NavigationState.doRun();

      // update models
      // incident
      // crew
      // defending crew (if combat)

      // now, start state (key, clearWorld, clearCache, param)
      _this.game.state.start("NavigationState", true, false, incident);
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

	addIncident(vo: IncidentVO) {
		console.log("* adding pulse item", vo);
    // clone wrapper
    var wrapper: any = document.getElementById("items-pulse-wrapper").cloneNode(true);
    var pulse = document.getElementById("pulse-grid");
    // insert item
    pulse.insertAdjacentElement("afterbegin", wrapper);
		// update labels
		var name: any = document.getElementById("pulse-item-label");
    var desc: any = document.getElementById("pulse-item-description");
		name.innerText = vo.name;
    desc.innerText = vo.description;
    wrapper.setAttribute("data-uid", JSON.stringify(vo));//.toString());// = vo;
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