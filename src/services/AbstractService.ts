// import * as dynamoose from "dynamoose";
import { AWSService } from './AWSService';
import { PlayersSchema } from './Schemas/PlayersSchema';
import { DynamooseService } from './DynamooseService';

class AbstractService {
	
	AWS: AWSService;
	
	constructor() {
		this.AWS = AWSService.getInstance();
	}

	findById(id: number, schema: any, callback: any): any { // schema must be a 'new' instance of said schema
		console.log("* AbstractService.findById", id, schema);
		this.AWS.dynamoose.findById(schema, id, function (err: any, result: any) {
			if (err) return callback(err, null);//console.log(JSON.stringify(err));
			// console.log("* item", item);
			else return callback(null, result);
		});
	}

	create(obj: object, schema: any, callback: any) {
		this.AWS.dynamoose.create(schema, obj, function(err: any, result: any) {
			if (err) return callback(err, null);
			else return callback(null, result);
		});
	}

	update(id: number, obj: object, schema: any, callback: any) {
		this.AWS.dynamoose.update(schema, { id: id }, DynamooseService.UPDATE_TYPE_PUT, obj, function (err: any, result: any) {
			if (err) return callback(err, null);
			else return callback(null, result);
		});
	}

	getAllByArray(ids: number[], schema: any, callback: any) {
		console.log("== AbstractService.getAllByArrays", ids);
		this.AWS.dynamoose.getAllByArray(schema, ids, function (err: any, result: any) {
			if (err) return callback(err, null);
			else return callback(null, result);
		});
	}

	// batchCreate(schema: any, batch: object[], callback: any): any {
	// 	for (let item of batch) {
	// 		this.AWS.dynamoose.create(schema, item, function(err, item) {

	// 		});
	// 	}
	// }
}

export { AbstractService }