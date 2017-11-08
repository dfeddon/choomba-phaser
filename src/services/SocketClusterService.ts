import AWS = require("aws-sdk");
// import * as AWS from "aws-sdk";
// import * as S3 from "aws-sdk/clients/s3";
// import * as AWS from "aws-sdk/clients/DynamoDB";

class SocketClusterService {
  private static instance: SocketClusterService;
  public socket: any = null;
  public socketData: object = {};

  private constructor() {}

  static getInstance() {
    if (!SocketClusterService.instance) {
      SocketClusterService.instance = new SocketClusterService();
      // one-time init code here...
    }

    return SocketClusterService.instance;
  }

  	init() {
		  var _this = this;
		var options = { port: 8000 };
		var socket = socketCluster.connect(options);
		this.socket = socket;

		socket.on("error", function(err: any) {
			throw "Socket error - " + err;
		});
		
		// var socketData = {id:0};
		
		socket.on("connect", function(data: any) {
			console.log("* CONNECTED", data);
			console.log("* client id", data.id);
			_this.socketData.id = data.id;
		});

		socket.on("rand", function(data: any) {
			console.log("RANDOM STREAM: " + data.rand, data);
		});

		var incidentsChannel = socket.subscribe("incidents");

		incidentsChannel.on("subscribeFail", function(err: any) {
			console.log("Failed to subscribe to the sample channel due to error: " + err);
		});

		incidentsChannel.watch(function(data: any) {
			console.log("++ Incidents channel message:", data, _this.socketData.id);
		});
			// socket.emit("createIncident", {f: "12345", t:"incident", i: "inc-23432"});
	}

}

export { SocketClusterService };
