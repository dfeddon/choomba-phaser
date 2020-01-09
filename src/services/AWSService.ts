// import AWS = require('aws-sdk');
import { DynamooseService } from './DynamooseService';
// import * as AWS from "aws-sdk";
// import * as S3 from "aws-sdk/clients/s3";
// import * as AWS from "aws-sdk/clients/DynamoDB";
// var dynamoose = require("dynamoose");

class AWSService {
	private static instance: AWSService;
	public dynamoose: DynamooseService;
	private constructor() {

	}

	static getInstance() {
		if (!AWSService.instance) {
			AWSService.instance = new AWSService();
			// one-time init code here...
		}

		return AWSService.instance;
	}

	start() {
		// console.log("* ", AWS);
		// amazon sdk globals
		/*AWS.config.region = "us-east-1";
		AWS.config.apiVersions = {
			dynamodb: '2012-08-10',
			// other service API versions
		};
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
			IdentityPoolId: 'us-east-1:b5e61654-606a-4082-adab-382e69a24413',
			Logins: { // optional tokens, used for authenticated login
				// 'graph.facebook.com': 'FBTOKEN',
				// 'www.amazon.com': 'AMAZONTOKEN',
				// 'accounts.google.com': 'GOOGLETOKEN'
			}
		});
		(AWS.config.credentials as AWS.Credentials).get(function(err) {
			if (err) console.log("+ AWS error:", err);
			else console.log("+ AWS Creds:", AWS.config.credentials);
		});
		// amazon sdk

		// dynamodb
		// var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
		// docClient abstracts away the 'type-casting' requirement of the above dynamoDB
		var docClient = new AWS.DynamoDB.DocumentClient();
		console.log("+ docClient", docClient);*/

		// var dynamoose = require('dynamoose');
		this.dynamoose = new DynamooseService();
		this.dynamoose.init();
		
		// // TODO: set auto-create to 'false' for production
		// dynamoose.setDefaults( { create: true });

		// var rnd = Math.floor(Math.random() * 10000 + 10000);
		// var uuid = parseInt(Date.now() + "" + rnd);
		
		// // Create cat model with default options
		// var PNK_incidents: any = dynamoose.model('PNK_incidents', 
		// { 
		// 	id: Number, 
		// 	name: String,
		// 	description: String,
		// 	type: Number,
		// 	structure: Number,
		// 	entity: Number,
		// });

		// // Create a new cat object
		// var incident: any = new PNK_incidents({id: 1, name: 'New Infiltration', description: 'Infiltration Description...', type: 1, structure: 1, entity: 1});

		// // Save to DynamoDB
		// incident.save();

		// // Lookup in DynamoDB
		// PNK_incidents.get(1).then(function (item: any) {
		// 	console.log('%c## Got incident - ' + item.name, "color:lime");
		// });		
	}

}

export { AWSService }
