import * as dynamoose from "dynamoose";
import { DynamooseService } from "../DynamooseService";

class SectorsSchema extends dynamoose.Schema {

	model: any;

	constructor(schema: any | {} = {}, options?: any) {

		schema = {
			id: { type: Number, hashKey: true },
			index: { type: Number },
			name: { type: String },
			districts: { type: [Number] }
		};

		options = {
			timestamps: true,
			useDocumentTypes: true
		};

		super(schema, options);

		this.model = dynamoose.model(DynamooseService.DYNAMODB_TABLE_SECTORS, this);
	}
}

export { SectorsSchema }