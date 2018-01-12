// import AWS = require("aws-sdk");
import LobbyState from "../states/LobbyState";
import { IncidentVO } from "../models/IncidentsVO";
import * as stub from "../helpers/stubJson.json";
import * as _ from "lodash";
import { CharacterVO } from "../models/CharactersVO";
import { Globals } from "./Globals";

// import * as AWS from "aws-sdk";
// import * as S3 from "aws-sdk/clients/s3";
// import * as AWS from "aws-sdk/clients/DynamoDB";
// import socketCluster = require("socketcluster-client");

class SocketClusterService {
	public static readonly CHANNEL_TYPE_INCIDENT: number = 1;

	public static readonly INCIDENT_TYPE_CREATED: number = 2;
	public static readonly INCIDENT_TYPE_JOINED: number = 3;
	public static readonly INCIDENT_TYPE_COMBAT_BEGIN: number = 4;

	private static instance: SocketClusterService;
  	public socket: any = null;
	// public socketData: object = {};
	// global incidents
	public globalIncidentsChannelName: string = "incidentsA";		
	public localIncidentChannel: any = null;
	public currentIncidentChannel: string;
	public game: Phaser.Game;
	public subs: string[] = [];
	public owning: string[] = [];

  private constructor() {}

  static getInstance() {
    if (!SocketClusterService.instance) {
      SocketClusterService.instance = new SocketClusterService();
      // one-time init code here...
    }

    return SocketClusterService.instance;
  }

  	init(game: Phaser.Game) {
		  var _this = this;
		var options = { port: 8000 };
		var socket = (socketCluster as any).connect(options);
		this.socket = socket;
		this.game = game;

		socket.on("error", function(err: any) {
			throw "Socket error - " + err;
		});
		
		socket.on("connect", function(data: any) {
			console.log("%c++ socket CONNECTED", "color:yellow", data);
			console.log("%c++ socket client id", "color:yellow", data.id);//, socket.id);
			// _this.socketData.id = data.id;
		});
	}

	channelSubbed(channel: string): boolean {
		if (_.indexOf(this.subs, channel) !== -1) {
			console.warn("++ Already subbed to channel", channel);
    	  return true;
		}
		else return false;
	}
	isChannelOwner(channel: string): boolean {
		if (_.indexOf(this.owning, channel) !== -1)
			return true;
		else return false;
	}

	startGlobalChannels() {
		console.log("== startGlobalChannels ==", this.game.state.getCurrentState().key);
		
		var _this = this;

		// ensure channel isn't already subbed
		if (this.channelSubbed(this.globalIncidentsChannelName)) return;

		var incidentsGlobalChannel = this.socket.subscribe(this.globalIncidentsChannelName);

		incidentsGlobalChannel.on("subscribe", function(e: string) {
			console.log("%c++ client subscribed", "color:yellow", e);
			// add channel to subs array
			_this.subs.push(e);
		})
		
		incidentsGlobalChannel.on("subscribeFail", function(err: any) {
      console.log("%c++ Failed to subscribe to the sample channel due to error: " + err, "color:yellow");
		});
		
		incidentsGlobalChannel.on("unsubscribe", function(e: any) {
			console.log("%c++ client unsubscribed", e);
			// remove channel from subs array
			_.pull(_this.subs, e);

			// if exists, unsub from incident channel
			console.log("%c++ chan", "color:yellow", _this.localIncidentChannel);
			if (_this.localIncidentChannel) {
				console.log("%c++ destroying current incident channel", "color:yellow");
				_this.socket.unwatch(_this.globalIncidentsChannelName);
				_this.socket.destroyChannel(_this.globalIncidentsChannelName);
			}
		});

		incidentsGlobalChannel.watch(function(data: any) {
			// data: { [f]: , [t]ype: , [i]d: , [o]wner: }
			console.log("%c++ Global incidentsA channel message:", "color:yellow", data, _this.socket.id);
			// if in lobby, add incident to punk net
			if (_this.game.state.getCurrentState().key === "LobbyState") {
				// console.log("****", stub);
				// var i = (stub as any).incidents[0];
				// var incident: IncidentVO = new IncidentVO(i);
				// console.log("* i", incident);
				// // var incident: IncidentVO = new IncidentVO();
				// incident.name = "Infiltration";// + _this.glob;
				// incident.description = "Hacking into facility...";
				// incident.type = IncidentVO.INCIDENT_TYPE_SPAWN;
				// incident.owner = data.o;
				// incident.channel = data.i;
				// incident.entity = new EntityVO();
				// push to punk net
				(_this.game.state.getCurrentState() as LobbyState).addIncident(data);
			}
    	});
	}

	stopGlobalChannels() {
		console.log("== stopGlobalChannels ==");
	}

	createChannel(_id: number, owner: string) {
		var _this = this;
		// stub: convert id to string
		let id: string = _id.toString();
		console.log("%c++ SocketClusterService.createChannel()", "color:yellow", id, owner, this.subs);

		// don't re-create an extant channel
		if (this.channelSubbed(id)) return;

		// store incident vo in db?
		// send incident vo id on createIncident socket call
		// create incident on server ([f]rom: socket_it, [t]ype: incident type, [i]ncident: incident id, [o]wner: entity id )
		this.socket.emit("createIncident", { f: this.socket.id, t: SocketClusterService.INCIDENT_TYPE_CREATED, i: id, o: owner });
		// subscribe to new incident channel
		this.localIncidentChannel = this.socket.subscribe(id);
		// sub fail
		this.localIncidentChannel.on("subscribeFail", function(err: any) {
			console.log("%c++ Failed to subscribe to the sample channel due to error: " + err, "color:yellow");
		});
		this.localIncidentChannel.on("subscribe", function(data: any) {
			console.log("%c++ Subscribed to channel: " + data, "color:yellow");
			// add channel to subs
			_this.subs.push(data);
			// we are the owner of this channel
			_this.owning.push(data);
		});
		// watcher (owner)
		this.localIncidentChannel.watch(function(data: any) {
			console.log("%c++ incident message (owner):", "color:yellow", data, _this.socket.id);
			_this.incidentChannelHandler(data, true);
		});
	}
	joinChannel(id: string) {
		console.log("== SocketClusterService.joinChannel ==", id);
		var _this = this;
		// subscribe to custom incident channel
		this.localIncidentChannel = this.socket.subscribe(id);
		// sub fail
		this.localIncidentChannel.on("subscribeFail", function(err: any) {
			console.log("%c++ Failed to subscribe to the sample channel due to error: " + err, "color:yellow");
		});
		// sub success
		this.localIncidentChannel.on("subscribe", function(data: string) {
			console.log("%c++ Successfully joined channel: " + data, "color:yellow");
			_this.subs.push(data);
			// remove/disable channel from globals
			if (_this.channelSubbed(_this.globalIncidentsChannelName)) {
				// this.globalIncidentsChannelName.
				console.log("*** JOINED, SO DISABLE THIS CHANNEL");
			}
			// dispatch "joined" event
			// send player role and speed data to owner
			// var crew: CharacterVO[] = Globals.getInstance().player.entity.characterPool;
			var sortedCrew: CharacterVO[] = Globals.getInstance().getCrew();
			var crewIds: number[] = _.map(sortedCrew, 'id');
			console.log("* sorted crew ids", crewIds);
			// var odata: object = {o1:}
			_this.localIncidentChannel.publish({ c: data, type: SocketClusterService.INCIDENT_TYPE_JOINED, sid: _this.socket.id, crew: crewIds }, function(err: any, data: any) {
				if (err)
					console.log("* publish err", err);
				else console.log("* publish success!", data);
			});
		});
		// watcher (non-owner)
		this.localIncidentChannel.watch(function(data: any) {
			console.log("%c++ incident message (not owner):", "color:yellow", data, _this.socket.id);
			_this.incidentChannelHandler(data, false);
		});
	}
	incidentChannelHandler(data: any, isOwner: boolean) {
		console.log("== incidentChannelHandler ==", data, isOwner);
		console.log("* state", this.game.state.getCurrentState().key);
		switch(data.type) {
			case SocketClusterService.INCIDENT_TYPE_JOINED: // joined incident
				if (isOwner) {
					console.log("%c++ opponent has *joined* your channel", "color:yellow");
					console.log("data", data);
					// opponent has joined
					var challenger: number[] = data.crew;
					var owner: number[] = _.map(Globals.getInstance().getCrew(), "id");
                 	// lock global channel (by id?) if user is *not* owner (limit of 2?)...
					// get id and query db
					// send *all* chars with alacrity for ordering to socket
					// var d = {p:null as any,c:null as any};
					// var chars: object[] = [{owner: owner},{challenger: challenger}];
					// d.p = chars;
					// d.c = data.c; incident id
					
					this.socket.emit("combatBegin", { c:data.c, owner:owner, challenger:challenger }, function(err: any, resp: any) {
						if (err)
							console.log("err", err);
						else console.log("resp", resp);
					});
				} else {
                 	console.log("%c++ you have *joined* a custom incident channel", "color:yellow");
                 	// init combat
				}
			break;

			case SocketClusterService.INCIDENT_TYPE_CREATED: // created incident
				if (isOwner) {
					console.log("%c++ you have *created* a custom incident channel", "color:yellow");
				} else {
					console.warn("THIS SHOULD NEVER HAVE HAPPENED!");
				}
			break;

			case SocketClusterService.INCIDENT_TYPE_COMBAT_BEGIN:
				console.log("%c++ you have begun COMBAT BEGIN", "color:yellow");
				console.log("data", data);
				var lobby: LobbyState = (this.game.state.getCurrentState() as LobbyState);
				lobby.combatBegin(data);
			break;
		}
	}
	
}

export { SocketClusterService };
