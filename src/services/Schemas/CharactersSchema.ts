import * as dynamoose from "dynamoose";
import { DynamooseService } from "../DynamooseService";

class CharactersSchema extends dynamoose.Schema {

	model: any;

	constructor(schema: any | {} = {}, options?: any) {

		schema = {
			id: { type: Number, hashKey: true },
			name: { type: String },
			class: { type: Number },
			position: { type: Number, default: 0 } // 0 => not in crew
		};

		options = {
			timestamps: true,
			useDocumentTypes: true
		};

		super(schema, options);

		this.model = dynamoose.model(DynamooseService.DYNAMODB_TABLE_CHARACTERS, this);
	}
}

export { CharactersSchema }