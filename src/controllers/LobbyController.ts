import { VectorVO } from "../models/VectorsVO";
import { SectorVO } from "../models/SectorVO";
import { SectorBlockVO } from "../models/SectorBlockVO";
import { SectorDistrictVO } from "../models/SectorDistrictVO";
import { NumberHelper } from "../helpers/NumberHelper";
import { SectorService } from "../services/SectorService";
import { SectorsSchema } from "../services/Schemas/SectorsSchema";
import { SectorView } from "../views/SectorView";
import { LobbyDom } from "../views/dom/LobbyDom";
import { SocketClusterService } from "../services/SocketClusterService";
import { IncidentsSchema } from "../services/Schemas/IncidentsSchema";
import { AWSService } from "../services/AWSService";
import { Globals } from "../services/Globals";
import { IncidentVO } from "../models/IncidentsVO";

class LobbyController {

	game: Phaser.Game;
	state: Phaser.State;
	sectorView: SectorView;
	selectedIncident: IncidentVO;
	player: string;
	sc: SocketClusterService = SocketClusterService.getInstance();

	constructor(game: Phaser.Game, state: Phaser.State) {
		console.log("* LobbyController constructor");
		this.game = game;
		this.state = state;
	}

	create(): LobbyController {
		console.log("* build sector");

		var dom = new LobbyDom(this.game, this.state).create();
		
		let totalBlocksX: number = 64;
		let totalBlocksY: number = 64;
		this.sectorView = new SectorView(this.game, 0, 0, "sectorView", totalBlocksX, totalBlocksY);
		// set bg color
		this.game.stage.backgroundColor = "#000000";
		// size game canvas
		this.game.scale.setGameSize(window.innerWidth, window.innerHeight);//h * 2);
		// set game bounds
		let offset: number = (74 * 74) / 4;
		// this.game.world.setBounds(-offset, -offset, (2500*2) + offset, (2500*2) + offset);
		this.game.world.setBounds(-offset, -offset, this.sectorView.gridGroup.width + (offset * 2),this.sectorView.gridGroup.height + (offset * 2));

		return this;
	}

	incidentsManager() {
		//////////////////////////////////////////////
		// open global incidents channel
		//////////////////////////////////////////////
		this.sc.startGlobalChannels();

		// player TODO: use entity id rather than rng
		this.player = this.game.rnd.integerInRange(1000, 9000).toString();

	}
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
		console.log("* id", vo.i, typeof (vo.i));
		// get incident from db by id
		AWSService.getInstance().dynamoose.findById(new IncidentsSchema(), vo.i, (err: any, item: any) => {
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

	incidentClickHandler() {
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
		AWSService.getInstance().dynamoose.create(new IncidentsSchema(), obj, (err: any, item: any) => {
			if (err) return console.log(err);
			else return this.incidentCreatedHandler(item);// console.log(item);
		});
	}
	pulseItemHandler = (e: any) => {
		// user elected to JOIN an extant incident (if successful, global event by id should be disabled)
		console.log("pulseItemHandler", e.getAttribute('data-uid'));
		var incident = JSON.parse(e.getAttribute('data-uid'));
		console.log("* incident", incident, incident._uid);

		// store incident, then send with combatBegin fnc
		this.selectedIncident = new IncidentVO(incident);
		// TODO: Assign attack/defense characters to incident
		console.log("* assign", this.selectedIncident);

		// join incident
		this.sc.joinChannel(incident.channel);
	}

	combatBegin = (combatBeginData: any) => { //incident: IncidentVO) {
		console.log("== LobbyState.combatBegin ==", combatBeginData, this.selectedIncident);
		console.log("* is instigator?", this.selectedIncident.entity, Globals.getInstance().player.entity.id);
		var opponent: number[];
		if (this.selectedIncident.entity.id === Globals.getInstance().player.entity.id) {
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
		this.game.state.start("NavigationState", true, false, { i: this.selectedIncident, o: opponent });
	}
	
	generateNewSector() {
		console.log("* LobbyController.createSector");
		new SectorService().createNewAndPopulate(function(err: any, result: any) {
			if (err) console.log("* error", JSON.stringify(err));
			else console.log("* success!");
		});
	}
}

export { LobbyController };
