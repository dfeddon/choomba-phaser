import * as dynamoose from "dynamoose";
import { DynamooseService } from "../DynamooseService";

class PlayersSchema extends dynamoose.Schema {

	model: any;
	
	constructor(schema: any | {} = {}, options?: any) {
		
		schema = {
			id: 			{ type: Number, hashKey: true },
			email: 			{ type: String },
			entity:			{ type: Number }
		};

		options = {
			timestamps: true,
			useDocumentTypes: true
		};

		super(schema, options);

		this.model = dynamoose.model(DynamooseService.DYNAMODB_TABLE_PLAYERS, this);
	}
}

export { PlayersSchema }