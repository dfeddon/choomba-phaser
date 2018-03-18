import * as dynamoose from "dynamoose";
import { DynamooseService } from "../DynamooseService";

class SectorDistrictsSchema extends dynamoose.Schema {

	model: any;

	constructor(schema: any | {} = {}, options?: any) {

		schema = {
			id: { type: Number, hashKey: true },
			index: { type: Number },
			name: { type: String },
			sector: { type: Number },
			type: { type: Number },
			owner: { type: Number },
			manager: { type: Number },
			blocks: { type: [ Number ] }
		};

		options = {
			timestamps: true,
			useDocumentTypes: true
		};

		super(schema, options);

		this.model = dynamoose.model(DynamooseService.DYNAMODB_TABLE_SECTOR_DISTRICTS, this);
	}
}

export { SectorDistrictsSchema }