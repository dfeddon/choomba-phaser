import * as dynamoose from "dynamoose";
import { DynamooseService } from "../DynamooseService";

class EntitiesSchema extends dynamoose.Schema {

	model: any;
	
	constructor(schema: any | {} = {}, options?: any) {
		
		schema = {
			id: 			{ type: Number, hashKey: true },
			name:			{ type: String },
			freelancers:	{ type: [Number] }
		};

		options = {
			timestamps: true,
			useDocumentTypes: true
		};

		super(schema, options);

		this.model = dynamoose.model(DynamooseService.DYNAMODB_TABLE_ENTITIES, this);
	}
}

export { EntitiesSchema }