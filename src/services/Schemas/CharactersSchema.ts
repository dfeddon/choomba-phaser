import * as dynamoose from "dynamoose";
import { DynamooseService } from "../DynamooseService";

class CharactersSchema extends dynamoose.Schema {

	model: any;

	constructor(schema: any | {} = {}, options?: any) {

		schema = {
			id: { type: Number, hashKey: true },
			handle: { type: String },
			role: { type: Number },
			position: { type: Number, default: 0 }, // 0 => not in crew
			status: { type: Number, default: 1 }, // 1 => available
			grit: { type: Number },
			reflexes: { type: Number },
			focus: { type: Number },
			cybermancy: { type: Number },
			meat: { type: Number }
		}

		options = {
			timestamps: true,
			useDocumentTypes: true
		};

		// schema.method('autopopulate', function() {
		// 	console.log("# CharacterSchema.autopopulate", this.class);
		// });

		super(schema, options);

		this.model = dynamoose.model(DynamooseService.DYNAMODB_TABLE_CHARACTERS, this);
	}
}

export { CharactersSchema }