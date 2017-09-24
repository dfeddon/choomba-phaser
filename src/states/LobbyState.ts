import { IncidentVO } from "../models/IncidentsVO";
import NameGenerator from "fantastical";

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
    this.game.state.start("NavigationState", true, false);
    this.doRun();
    console.log("***", NameGenerator);
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

      switch(i.id) {
        case "pulseClicker":
          console.log("add pulse item");
          _this.glob++;
          var item: IncidentVO = new IncidentVO();
          item.name = "Turf War " + _this.glob;
          item.description = "Sensors alerted near Sinjun Corps red tower just outside Frisco Sprawl. Too-tall Redline Hackers suspected.";
          _this.addIncident(item);
        break;
      }
	  }
	
    this.doc.pulseItemHandler = function(e: any) {
      console.log("pulseItemHandler", e.target);
      // hide lobby UI
      document.getElementById("lobbyState").style.display = "none";
      // show game canvas
      document.getElementById("gameView").style.display = "grid";
      // un-pause game
      _this.game.paused = false;
      // switch to NavigationState
      // _this.game.state.states.NavigationState.doRun();
      _this.game.state.start("NavigationState", true, false);
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