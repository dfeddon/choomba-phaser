import AWS = require("aws-sdk");
import LobbyState from "../states/LobbyState";
import { IncidentVO } from "../models/IncidentsVO";
// import * as AWS from "aws-sdk";
// import * as S3 from "aws-sdk/clients/s3";
// import * as AWS from "aws-sdk/clients/DynamoDB";

class SocketClusterService {
  private static instance: SocketClusterService;
  public socket: any = null;
	public socketData: object = {};
	public incidentChannel: any = null;
	public currentIncidentChannel: string;
	public game: Phaser.Game;

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
		
		// var socketData = {id:0};
		
		socket.on("connect", function(data: any) {
			console.log("%c++ CONNECTED", "color:yellow", data);
			console.log("%c++ client id", "color:yellow", data.id);
			_this.socketData.id = data.id;
		});

		// socket.on("rand", function(data: any) {
		// 	console.log("RANDOM STREAM: " + data.rand, data);
		// });

		// // global incidents
		// var incidentsGlobalChannel = socket.subscribe("incidentsA");

		// incidentsGlobalChannel.on("subscribe", function(e: any) {
		// 	console.log("++ client subscribed", e);
		// })
		// incidentsGlobalChannel.on("subscribeFail", function(err: any) {
    //   console.log("++ Failed to subscribe to the sample channel due to error: " + err);
		// });
		// incidentsGlobalChannel.on("unsubscribe", function(e: any) {
		// 	console.log("++ client unsubscribed", e);
		// })

		// incidentsGlobalChannel.watch(function(data: any) {
    //   console.log("++ Global incidentsA channel message:", data, _this.socketData.id);
    // });
			// socket.emit("createIncident", {f: "12345", t:"incident", i: "inc-23432"});
	}

	startGlobalChannels() {
		console.log("== startGlobalChannels ==", this.game.state.getCurrentState().key);
		
		var _this = this;

		// global incidents
		var incidentsGlobalChannel = this.socket.subscribe("incidentsA");

		incidentsGlobalChannel.on("subscribe", function(e: any) {
			console.log("%c++ client subscribed", "color:yellow", e);
		})
		
		incidentsGlobalChannel.on("subscribeFail", function(err: any) {
      console.log("%c++ Failed to subscribe to the sample channel due to error: " + err, "color:yellow");
		});
		
		incidentsGlobalChannel.on("unsubscribe", function(e: any) {
			console.log("%c++ client unsubscribed", e);
			// if exists, unsub from incident channel
			console.log("%c++ chan", "color:yellow", _this.incidentChannel);
			if (_this.incidentChannel) {
				console.log("%c++ destroying current incident channel", "color:yellow");
				_this.socket.unwatch(_this.currentIncidentChannel);
				_this.socket.destroyChannel(_this.currentIncidentChannel);
			}
		});

		incidentsGlobalChannel.watch(function(data: any) {
			console.log("%c++ Global incidentsA channel message:", "color:yellow", data, _this.socketData.id);
			// if in lobby, add incident to punk net
			if (_this.game.state.getCurrentState().key === "LobbyState") {
				var incident: IncidentVO = new IncidentVO();
				incident.name = "Infiltration";// + _this.glob;
				incident.description = "Hacking into facility...";
				incident.type = IncidentVO.INCIDENT_TYPE_SPAWN;
				// incident.entity = new EntityVO();
				(_this.game.state.getCurrentState() as LobbyState).addIncident(incident);
			}
    });
	}

	stopGlobalChannels() {
		console.log("== stopGlobalChannels ==");
	}

	createChannel(name: string, owner: string) {
		var _this = this;
		console.log("%c++ SocketClusterService.createChannel()", "color:yellow", name, owner, this.currentIncidentChannel);
		// don't re-create an extant channel
		if (name === this.currentIncidentChannel)
			return console.warn("! channel already exists!");
		else this.currentIncidentChannel = name;
		// create incident on server
		this.socket.emit("createIncident", { f: this.socketData.id, t:2, i: name, o: owner });
		// subscribe to new incident channel
		this.incidentChannel = this.socket.subscribe(name);
		// sub fail
		this.incidentChannel.on("subscribeFail", function(err: any) {
			console.log("%c++ Failed to subscribe to the sample channel due to error: " + err, "color:yellow");
		});
		// watcher
		this.incidentChannel.watch(function(data: any) {
			console.log("%c++ incident message:", "color:yellow", data, _this.socketData.id);
		});
		// this['ic_' + name] = this.socket.subscribe(name);
		// watcher
		// this['ic_' + name].watch(function(data: any) {
		// 	console.log("++ ic message:", data, _this.socketData.id);
		// });
	}
	
}

export { SocketClusterService };
