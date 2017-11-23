import * as dynamoose from "dynamoose";
import { DynamooseService } from "../DynamooseService";

class EntitiesSchema extends dynamoose.Schema {

	model: any;
	
	constructor(schema: any | {} = {}, options?: any) {
		
		schema = {
			id: 			{ type: Number, hashKey: true },
			name: 			{ type: String },
			description: 	{ type: String },
			type: 			{ type: Number },
			structure: 		{ type: Number },
			entity: 		{ type: Number }
		};

		options = {
			timestamps: true
		};

		super(schema, options);

		this.model = dynamoose.model(DynamooseService.DYNAMODB_TABLE_INCIDENTS, this);
	}
}

export { EntitiesSchema }