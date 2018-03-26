import { Globals } from "../../services/Globals";
import { LobbyDropper } from "../../controllers/LobbyDropper";
import { LobbyContentController } from "../../controllers/LobbyContentController";
import { AWSService } from "../../services/AWSService";
import { NumberHelper } from "../../helpers/NumberHelper";

class LobbyDom {
	game: Phaser.Game;
	state: Phaser.State;

	charDragSource: any;
	charDragTarget: any;
	glob: number = 0;
	doc: any = document;
	// public sc: SocketClusterService;
	// sc: SocketClusterService = SocketClusterService.getInstance();
	currentChannel: any;
	// player id stub
	player: string;
	// selectedIncident: IncidentVO;
	lobbyContentController: LobbyContentController = new LobbyContentController();
	globals: Globals = Globals.getInstance();
	
	constructor(game: Phaser.Game, state: Phaser.State) {
		this.game = game;
		this.state = state;
	}
	create() {
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
			} // end for loop */
		}

		document.ontouchstart = (e) => {
			var i = e.target as any;
			console.log("ontouchstart", i.id);
			e.stopImmediatePropagation();
		};
		//////////////////////////////////////////////
		// hide game view
		//////////////////////////////////////////////
		document.getElementById("gameView").style.display = "grid";

		//////////////////////////////////////////////
		// show lobby UI
		//////////////////////////////////////////////
		var lobbyStateHtml = document.getElementById("lobbyState");
		lobbyStateHtml.style.display = "grid";
		lobbyStateHtml.addEventListener("click", (e) => {
			console.log("* lobbyStateHTML clicked *", e.clientY, lobbyStateHtml.clientHeight);
			//lobbyStateHtml.style.display = "none";
			// if (e.clientY > 1000)//lobbyStateHtml.clientHeight > 1000)
			// 	lobbyStateHtml.style.height = "10%";
			// else lobbyStateHtml.style.height = "10%";//"100%";
		});

		//////////////////////////////////////////////
		// listen for pulse click event (stub)
		//////////////////////////////////////////////
		/*this.doc.getElementById('pulseClicker').onclick = (e: MouseEvent) => {
			console.log("* onclick", e.target);
			console.log("* player", this.player);

			// // TODO: send custom incident socket vo
			// // create incidentVO
			// var obj: object = {
			// 	id: NumberHelper.UIDGenerator(),
			// 	handle: "Cipher's Incident",
			// 	description: "Tunnelling down into the grime of BAMA Sprawl...",
			// 	entity: Globals.getInstance().player.entity.id,
			// 	property: 1
			// };
			// // save it to dynamoDB?
			// AWSService.getInstance().dynamoose.create(new IncidentsSchema(), obj, (err: any, item: any) => {
			// 	if (err) return console.log(err);
			// 	else return this.incidentCreatedHandler(item);// console.log(item);
			// });
		}*/

		this.dragAndDrop();

		//////////////////////////////////////////////
		//////////////////////////////////////////////
		// this.doc.pulseItemHandler = (e: any) => {
		// 	// user elected to JOIN an extant incident (if successful, global event by id should be disabled)
		// 	console.log("pulseItemHandler", e.getAttribute('data-uid'));
		// 	var incident = JSON.parse(e.getAttribute('data-uid'));
		// 	console.log("* incident", incident, incident._uid);

		// 	// store incident, then send with combatBegin fnc
		// 	this.selectedIncident = new IncidentVO(incident);
		// 	// TODO: Assign attack/defense characters to incident
		// 	console.log("* assign", this.selectedIncident);

		// 	// join incident
		// 	this.sc.joinChannel(incident.channel);
		// }

		//////////////////////////////////////////////
		//////////////////////////////////////////////
		// this.combatBegin = (combatBeginData: any) => { //incident: IncidentVO) {
		// 	console.log("== LobbyState.combatBegin ==", combatBeginData, this.selectedIncident);
		// 	console.log("* is instigator?", this.selectedIncident.entity, Globals.getInstance().player.entity.id);
		// 	var opponent: number[];
		// 	if (this.selectedIncident.entity.id === Globals.getInstance().player.entity.id) {
		// 		opponent = combatBeginData.challenger;
		// 	} else opponent = combatBeginData.owner;
		// 	// hide lobby UI
		// 	document.getElementById("lobbyState").style.display = "none";
		// 	// show game canvas
		// 	document.getElementById("gameView").style.display = "grid";
		// 	// un-pause game
		// 	this.game.paused = false;
		// 	// switch to NavigationState
		// 	// _this.game.state.states.NavigationState.doRun();

		// 	// update models
		// 	// incident
		// 	// crew
		// 	// defending crew (if combat)

		// 	// now, start state (key, clearWorld, clearCache, param)
		// 	this.game.state.start("NavigationState", true, false, { i: this.selectedIncident, o: opponent });
		// }
	}
	
	//////////////////////////////////////////////
	// drag and drop crew members
	//////////////////////////////////////////////
	//////////////////////////////////////////////
	// touch events
	//////////////////////////////////////////////
	dragStart(e: any) {
		console.log("dragstart");
	}
	dragAndDrop() {
		document.ondragstart = (e) => {
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
			this.charDragSource = img;
			e.stopImmediatePropagation();
		};
		document.ondragover = (e) => {
			// console.log("ondragover", e);
			e.preventDefault();
		};
		document.ondragenter = (e) => {
			console.log("ondragenter");
		}
		document.ondragleave = (e) => {
			console.log("ondragleave");
		}
		// ... and drop
		document.ondrop = (e) => {
			console.log("* ondrop", e);
			if (e.stopPropagation)
				e.stopPropagation();
			if (e.preventDefault)
				e.preventDefault();
			let targ = e.target as any;
			let src = this.charDragSource;

			// handle drop logic in LobbyDropper class
			LobbyDropper.dropped(src, targ);
		};
	}

	renameDescendantsOfNode = (node: any, suffix: number) => {
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

export { LobbyDom };