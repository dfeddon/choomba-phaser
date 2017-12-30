import * as dynamoose from "dynamoose";
import { DynamooseService } from "../DynamooseService";

class IncidentsSchema extends dynamoose.Schema {

	model: any;
	
	constructor(schema: any | {} = {}, options?: any) {
		
		schema = {
			id: 			{ type: Number, hashKey: true },
			handle: 		{ type: String },
			description: 	{ type: String },
			type: 			{ type: Number },
			property: 		{ type: Number },
			entity: 		{ type: Number }
		};

		options = {
			timestamps: true,
			useDocumentTypes: true
		};

		super(schema, options);

		this.model = dynamoose.model(DynamooseService.DYNAMODB_TABLE_INCIDENTS, this);
	}
}

export { IncidentsSchema }