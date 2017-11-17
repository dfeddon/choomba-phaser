import { IncidentsSchema } from "./Schemas/IncidentsSchema";

// import AWS = require('aws-sdk');
// import * as AWS from "aws-sdk";
// import * as S3 from "aws-sdk/clients/s3";
// import * as AWS from "aws-sdk/clients/DynamoDB";
var dynamoose = require("dynamoose");

class DynamooseService {
	constructor() {
		// super();
		// var dynamoose = require('dynamoose');
		dynamoose.AWS.config.update({
			accessKeyId: 'AKIAIH2FBIAF5JYWFJFA',
			secretAccessKey: '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',
			region: 'us-east-1'
		});
		
		// TODO: set auto-create to 'false' for production
		dynamoose.setDefaults( { create: true });
	}

	UIDGenerator(): number {
		var rnd = Math.floor(Math.random() * 10000 + 10000);
		var uid = parseInt(Date.now() + "" + rnd);

		return uid;
	}

	init(): void {
		// var Schema = dynamoose.Schema;
		// var IncidentsSchema = new Schema({
		// 	// timestamps: true,
		// 	id: { type: Number, hashKey: true },
		// 	name: { type: String },
		// 	description: { type: String },
		// 	type: { type: Number },
		// 	structure: { type: Number },
		// 	entity: { type: Number }
		// }, {
		// 	timestamps: true
		// });
		// // IncidentsSchema.virtualset(function() {
		// // 	this.id = this.
		// // })
		// console.log("## Schema", IncidentsSchema);
		var schema = new IncidentsSchema();
		console.log("asdlkfjas;", schema);
		// var incidentsSchema: any = schema.model;//dynamoose.model("PNK_incidents", schema);
		var incidentsModel: any = dynamoose.model("PNK_incidents", schema);
		// console.log("derek", new incidentsSchema());
		// Create cat model with default options
		// var PNK_incidents: any = dynamoose.model('PNK_incidents', { 
		// 	id: Number, 
		// 	name: String,
		// 	description: String,
		// 	type: Number,
		// 	structure: Number,
		// 	entity: Number,
		// });
		// console.log("## Model", IncidentsSchema);

		// Create a new cat object
		var incident = new incidentsModel({
			id: this.UIDGenerator(), 
			name: 'New Infiltration', 
			description: 'Infiltration Description...', 
			type: 1, 
			structure: 1, 
			entity: 1
		});
		console.log("model", incident);

		// Save to DynamoDB
		incident.save();

		// Lookup in DynamoDB
		incident.get(1510866070385).then(function(item: any) {
      		console.log("%c## Got incident - " + item, "color:lime");
    	});
	}
}

export { DynamooseService };