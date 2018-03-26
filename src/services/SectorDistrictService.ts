import { AbstractService } from "./AbstractService";
import { SectorDistrictsSchema } from "./Schemas/SectorDistrictsSchema";
import { SectorVO } from "../models/SectorVO";

class SectorDistrictService extends AbstractService {

	// privates

	// constructor
	constructor() {
		super();
	}

	// begin overrides super params (explicitly defining schema)
	findById(id: number, callback: any): any {
		super.findById(id, new SectorDistrictsSchema(), callback);
	}
	create(obj: SectorVO, callback: any): any {
		super.create(obj, new SectorDistrictsSchema(), callback);
	}
	update(id: number, obj: SectorVO, type: number, callback: any) {
		super.update(id, obj, new SectorDistrictsSchema(), callback);
	}
	getAllByArray(ids: number[], callback: any) {
		super.getAllByArray(ids, new SectorDistrictsSchema(), callback);
	}
	batchCreate(items: any[], options: object, callback: any) {
		super.batchCreate(new SectorDistrictsSchema(), items, options, callback);
	}
	batchGet(items: any[], options: object, callback: any) {
		super.batchGet(new SectorDistrictsSchema(), items, options, callback);
	}
	// end overrides
	// batchCreate(batch: CharacterVO[], callback: any): any {
	// 	var i = batch.length;
	// 	var array: CharacterVO[];
	// 	function iterate(): any {
	// 		this.create(batch[i], function (err: any, result: any) {
	// 			if (err) return callback(err, null);
	// 			// reduce iterator
	// 			i--;
	// 			// add new item to array
	// 			array.push(new CharacterVO(result));
	// 			// if done, return array
	// 			if (i === 0) return callback(null, array);
	// 		});
	// 	}
	// 	iterate();
	// }

	// getters & setters
}

export { SectorDistrictService };
