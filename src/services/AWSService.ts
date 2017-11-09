import AWS = require('aws-sdk');
// import * as AWS from "aws-sdk";
// import * as S3 from "aws-sdk/clients/s3";
// import * as AWS from "aws-sdk/clients/DynamoDB";

class AWSService {
	private static instance: AWSService;
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
		AWS.config.region = "us-east-1";
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
		console.log("+ docClient", docClient);
	}

}

export { AWSService }