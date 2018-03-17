import * as dynamoose from "dynamoose";
import { DynamooseService } from "../DynamooseService";

class SectorBlocksSchema extends dynamoose.Schema {

	model: any;

	constructor(schema: any | {} = {}, options?: any) {

		schema = {
			id: { type: Number, hashKey: true },
			index: { type: Number, rangeKey: true },
			name: { type: String },
			type: { type: Number },
			owner: { type: Number },
			manager: { type: Number },
			district: { type: Number }

		};

		options = {
			timestamps: true,
			useDocumentTypes: true
		};

		super(schema, options);

		this.model = dynamoose.model(DynamooseService.DYNAMODB_TABLE_SECTOR_BLOCKS, this);
	}
}

export { SectorBlocksSchema }