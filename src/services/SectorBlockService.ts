import { AbstractService } from "./AbstractService";
import { SectorBlockVO } from "../models/SectorBlockVO";
import { SectorBlocksSchema } from "./Schemas/SectorBlocksSchema"

class SectorBlockService extends AbstractService {

	// privates

	// constructor
	constructor() {
		super();
	}

	// begin overrides super params (explicitly defining schema)
	findById(id: number, callback: any): any {
		super.findById(id, new SectorBlocksSchema(), callback);
	}
	create(obj: SectorBlockVO, callback: any): any {
		super.create(obj, new SectorBlocksSchema(), callback);
	}
	update(id: number, obj: SectorBlockVO, type: number, callback: any) {
		super.update(id, obj, new SectorBlocksSchema(), callback);
	}
	getAllByArray(ids: number[], schema: any, callback: any) {
		super.getAllByArray(ids, new SectorBlocksSchema(), callback);
	}
	batchCreate(schema: any, items: any[], options: object, callback: any) {
		super.batchCreate(new SectorBlocksSchema(), items, options, callback);
	}

	// end overrides

	// getters & setters
}

export { SectorBlockService };
