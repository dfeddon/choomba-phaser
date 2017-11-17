// var dynamoose = require("dynamoose");
import * as dynamoose from "dynamoose";
class IncidentsSchema extends dynamoose.Schema {
	// schema: Schema;
	// model: any;
	
	constructor(schema?: any, options?: any) {
		console.log("* constructor");
		// var Schema = dynamoose.Schema;
		schema = new dynamoose.Schema(
		{
			id: { type: Number, hashKey: true },
			name: { type: String },
			description: { type: String },
			type: { type: Number },
			structure: { type: Number },
			entity: { type: Number }
		});
		// options = {
		// 	timestamps: true
		// };
		console.log('schema', schema);//, options);
		super(schema);//, options);

		// IncidentsSchema.virtualset(function() {
		// 	this.id = this.
		// })
		// console.log("## Schema", IncidentsSchema);
		// dynamoose.model("PNK_incidents", schema);
		// this.schema = schema;
		// this.model = dynamoose.model("PNK_incidents", this);
	}
}

export { IncidentsSchema }