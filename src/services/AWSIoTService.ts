import * as AWS from "aws-sdk";
// import * as S3 from "aws-sdk/clients/s3";
// import * as DB from "aws-sdk/clients/DynamoDB";
import * as awsIot from "aws-iot-device-sdk";

class AWSIoTService {
  private static instance: AWSIoTService;
  private iot: any = null;
  private client: any;
  public iotTopic: any = null;

  private constructor() {}

  static getInstance() {
    if (!AWSIoTService.instance) {
      AWSIoTService.instance = new AWSIoTService();
	  // one-time init code here...
    }

    return AWSIoTService.instance;
  }

  connect(topic: any, iotEndpoint: any, region: any, accessKey: string, secretKey: string, sessionToken: string) {
	console.log("== IoT.connect ==");
	
	this.iotTopic = topic;

    const mqttClient = awsIot.device({
      region: region,
      protocol: "wss",
      port: 443,
      host: iotEndpoint,
      debug: true,
      accessKeyId: "", //accessKey,
      secretKey: "", //secretKey,
      sessionToken: "" //sessionToken
    });

	var cognitoIdentity = new AWS.CognitoIdentity();
	AWS.config.credentials.get(function(err, data) {
		if (!err) {
			console.log("retrieved identity: " + AWS.config.credentials.identityId);
			var params = {
			IdentityId: AWS.config.credentials.identityId
			};
			cognitoIdentity.getCredentialsForIdentity(params, function(err, data) {
			if (!err) {
				//
				// Update our latest AWS credentials; the MQTT client will use these
				// during its next reconnect attempt.
				//
				mqttClient.updateWebSocketCredentials(
					data.Credentials.AccessKeyId,
					data.Credentials.SecretKey,
					data.Credentials.SessionToken
				);
			} else {
				console.log("error retrieving credentials: " + err);
				alert("error retrieving credentials: " + err);
			}
			});
		} else {
			console.log("error retrieving identity:" + err);
			alert("error retrieving identity: " + err);
		}
	});	
	mqttClient.on("connect", this.onConnect);
	mqttClient.on("message", this.onMessage);
	mqttClient.on("close", this.onClose);
  }

  send(message: any) {
	  this.client.publish(this.iotTopic, message);
  }

	handleConnected = () => {};

	onConnect = () => {
		this.client.subscribe(this.iotTopic);
		console.log('Successfully connected to AWS IoT');
		this.handleConnected();
	};

	handleReceivedMessage = (message: any) => {};
	
	onMessage = (topic: any, message: any) => {
		this.handleReceivedMessage(message);
	};

	onClose = () => {
		console.log('Failed to connect to AWS IoT');
	};

}

export { AWSIoTService };
