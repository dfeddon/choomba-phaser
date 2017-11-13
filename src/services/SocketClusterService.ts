import AWS = require("aws-sdk");
import LobbyState from "../states/LobbyState";
import { IncidentVO } from "../models/IncidentsVO";
import * as _ from "lodash";
// import * as AWS from "aws-sdk";
// import * as S3 from "aws-sdk/clients/s3";
// import * as AWS from "aws-sdk/clients/DynamoDB";
// import socketCluster = require("socketcluster-client");

class SocketClusterService {
	public static readonly CHANNEL_TYPE_INCIDENT: number = 1;

  private static instance: SocketClusterService;
  public socket: any = null;
	// public socketData: object = {};
	// global incidents
	public globalIncidentsChannelName: string = "incidentsA";		
	public incidentChannel: any = null;
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
		var socket = socketCluster.connect(options);
		this.socket = socket;
		this.game = game;

		socket.on("error", function(err: any) {
			throw "Socket error - " + err;
		});
		
		socket.on("connect", function(data: any) {
			console.log("%c++ CONNECTED", "color:yellow", data);
			console.log("%c++ client id", "color:yellow", data.id);//, socket.id);
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
			console.log("%c++ chan", "color:yellow", _this.incidentChannel);
			if (_this.incidentChannel) {
				console.log("%c++ destroying current incident channel", "color:yellow");
				_this.socket.unwatch(_this.globalIncidentsChannelName);
				_this.socket.destroyChannel(_this.globalIncidentsChannelName);
			}
		});

		incidentsGlobalChannel.watch(function(data: any) {
			console.log("%c++ Global incidentsA channel message:", "color:yellow", data, _this.socket.id);
			// if in lobby, add incident to punk net
			if (_this.game.state.getCurrentState().key === "LobbyState") {
				var incident: IncidentVO = new IncidentVO();
				incident.name = "Infiltration";// + _this.glob;
				incident.description = "Hacking into facility...";
				incident.type = IncidentVO.INCIDENT_TYPE_SPAWN;
				incident.owner = data.o;
				incident.channel = data.i;
				// incident.entity = new EntityVO();
				(_this.game.state.getCurrentState() as LobbyState).addIncident(incident);
			}
    });
	}

	stopGlobalChannels() {
		console.log("== stopGlobalChannels ==");
	}

	createChannel(id: string, owner: string) {
		var _this = this;
		console.log("%c++ SocketClusterService.createChannel()", "color:yellow", id, owner, this.subs);

		// don't re-create an extant channel
		if (this.channelSubbed(id)) return;

		// create incident on server
		this.socket.emit("createIncident", { f: this.socket.id, t:2, i: id, o: owner });
		// subscribe to new incident channel
		this.incidentChannel = this.socket.subscribe(id);
		// sub fail
		this.incidentChannel.on("subscribeFail", function(err: any) {
			console.log("%c++ Failed to subscribe to the sample channel due to error: " + err, "color:yellow");
		});
		this.incidentChannel.on("subscribe", function(data: any) {
			console.log("%c++ Subscribed to channel: " + data, "color:yellow");
			// add channel to subs
			_this.subs.push(data);
			// we are the owner of this channel
			_this.owning.push(data);
		});
		// watcher
		this.incidentChannel.watch(function(data: any) {
			console.log("%c++ incident message (owner):", "color:yellow", data, _this.socket.id);
			switch(data.type) {
				case 3: // joined
					console.log("%c++ opponent has joined your channel", "color:yellow");
					// opponent has joined
					// get id and query db
					// send *all* chars with alacrity for ordering to socket
					// var d = {p:null as any,c:null as any};
					var chars: object[] = [{p4:1, p3:3, p2:1, p1:4},{p4:2, p3:3, p2:2, p1:3}]
					// d.p = chars;
					// d.c = data.c;
					_this.socket.emit("combatBegin", {c:data.c, p:chars}, function(err: any, resp: any) {
						if (err)
							console.log("err", err);
						else {
							console.log("resp", resp);
						}
					});
				break;
			}
		});
		// this['ic_' + id] = this.socket.subscribe(id);
		// watcher
		// this['ic_' + id].watch(function(data: any) {
		// 	console.log("++ ic message:", data, _this.socketData.id);
		// });
	}
	joinChannel(id: string) {
		console.log("== SocketClusterService.joinChannel ==", id);
		var _this = this;
		// subscribe to custom incident channel
		this.incidentChannel = this.socket.subscribe(id);
		// sub fail
		this.incidentChannel.on("subscribeFail", function(err: any) {
			console.log("%c++ Failed to subscribe to the sample channel due to error: " + err, "color:yellow");
		});
		// sub success
		this.incidentChannel.on("subscribe", function(data: string) {
			console.log("%c++ Successfully joined channel: " + data, "color:yellow");
			_this.subs.push(data);
			_this.incidentChannel.publish({ c: data, type: 3, sid: _this.socket.id, id: "11223344" }, function(err: any) {
				console.log("* publish err", err);
			});
		});
		// watcher
		this.incidentChannel.watch(function(data: any) {
			console.log("%c++ incident message (not owner):", "color:yellow", data, _this.socket.id);
			if (data.type === 3) {
				console.log("got joined event");
				// if user is owner of channel...
				// lock channel?
				// init combat
			}
		});
	}
	
}

export { SocketClusterService };
