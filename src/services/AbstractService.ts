// import * as dynamoose from "dynamoose";
import { AWSService } from './AWSService';
import { PlayersSchema } from './Schemas/PlayersSchema';
import { DynamooseService } from './DynamooseService';
import { AbstractVO } from '../models/AbstractVO';

class AbstractService {
	
	AWS: AWSService;
	// batchRemaining: AbstractVO[];
	
	constructor() {
		this.AWS = AWSService.getInstance();
	}

	findById(id: number, schema: any, callback: any): any {
		this.AWS.dynamoose.findById(schema, id, function (err: any, result: any) {
			if (err) return callback(err, null);
			else return callback(null, result);
		});
	}

	create(obj: AbstractVO, schema: any, callback: any) {
		this.AWS.dynamoose.create(schema, obj.toDatabase(false), function(err: any, result: any) {
			if (err) return callback(err, null);
			else return callback(null, result);
		});
	}

	update(key: number, obj: AbstractVO, schema: any, callback: any) {
		this.AWS.dynamoose.update(schema, { id: key }, DynamooseService.UPDATE_TYPE_PUT, obj.toDatabase(), function (err: any, result: any) {
			if (err) return callback(err, null);
			else return callback(null, result);
		});
	}

	delete(key: number, schema: any, callback: any, options: any) {
		this.AWS.dynamoose.delete(schema, key, options, function (err: any, result: any) {
			if (err) return callback(err, null);
			else return callback(null, result);
		});
	}

	getAllByArray(keys: number[], schema: any, callback: any) {
		this.AWS.dynamoose.getAllByArray(schema, keys, function (err: any, result: any) {
			if (err) return callback(err, null);
			else return callback(null, result);
		});
	}

	getAll(schema: any, callback: any) {
		this.AWS.dynamoose.getAll(schema, function(err: any, result: any) {
			if (err) return callback(err, null);
			else return callback(null, result);
		})
	}

	batchCreate(schema: any, items: AbstractVO[], options: object | {}, callback: any) {
		// if too many items, cycle the batch with a timer
		if (items.length < 25) {
			// convert vo's to objects
			let batch: any[] = [];
			for (let item of items) {
				batch.push(item.toDatabase(false));
			}
			this.AWS.dynamoose.batchCreate(schema, batch, options, function(err: any, result: any) {
				if (err) return callback(err, null);
				else return callback(null, result);
			});
		}
		else this.batchCycle(schema, items, options, callback);
	}

	batchCycle(schema: any, items: AbstractVO[], options: object | {}, callback: any) {
		console.log("* batch cycling", items.length);
		let __this = this;
		// chuck 50 items per cycle @ 20 second intervals
		let cycles = items.length / 50;
		// determine items to batch
		let max = (items.length < 50) ? items.length : 50; 
		let chunk: AbstractVO[] = items.splice(0, max);

		// convert vo's to objects
		let batch: any[] = [];
		for (let item of chunk) {
			batch.push(item.toDatabase(false));
		}
		this.AWS.dynamoose.batchCreate(schema, batch, options, function (err: any, result: any) {
			if (err) return callback(err, null);
			else {
				if (cycles < 1)
					return callback(null, result);
				else {
					// wait 20 seconds
					setTimeout(() => {
						__this.batchCycle(schema, items, options, callback);
					}, 1000 * 20);
				}
			}
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