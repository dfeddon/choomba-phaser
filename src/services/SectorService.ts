import { AbstractService } from "./AbstractService";
import { SectorsSchema } from "./Schemas/SectorsSchema";
import { SectorVO } from "../models/SectorVO";
import { VectorVO } from "../models/VectorsVO";
import { SectorDistrictVO } from "../models/SectorDistrictVO";
import { SectorBlockVO } from "../models/SectorBlockVO";
import { NumberHelper } from "../helpers/NumberHelper";
import { SectorDistrictService } from "./SectorDistrictService";
import { SectorBlockService } from "./SectorBlockService";
import { SectorDistrictsSchema } from "./Schemas/SectorDistrictsSchema";
import { SectorBlocksSchema } from "./Schemas/SectorBlocksSchema";

class SectorService extends AbstractService {

	// privates

	// constructor
	constructor() {
		super();
	}

	// begin overrides super params (explicitly defining schema)
	findById(id: number, callback: any): any {
		super.findById(id, new SectorsSchema(), callback);
	}
	create(obj: SectorVO, callback: any): any {
		super.create(obj, new SectorsSchema(), callback);
	}
	update(id: number, obj: SectorVO, type: number, callback: any) {
		super.update(id, obj, new SectorsSchema(), callback);
	}
	getAllByArray(ids: number[], schema: any, callback: any) {
		super.getAllByArray(ids, new SectorsSchema(), callback);
	}
	getAll(schema: any, callback: any) {
		super.getAll(new SectorsSchema(), callback);
	}
	batchCreate(schema: any, items: any[], options: object, callback: any) {
		super.batchCreate(new SectorsSchema(), items, options, callback);
	}
	// end overrides

	// custom functions
	createNewAndPopulate(callback: any) {
		let __this = this;
		this.getAll(new SectorsSchema(), function (err: any, result: any) {
			console.log("* result", result.count);
			let sectorCount: number = parseInt(result.count);
			// validate number of extant sectors
			if (Number.isNaN(sectorCount) === true)
				return callback("Invalid sector count!", result);
			let sectorIndex: number = result.count + SectorVO.SECTOR_INDEX_BASE_VALUE;
			// create new sector
			let vo: SectorVO = new SectorVO(sectorCount, "Sector " + (sectorIndex).toString());

			let district: SectorDistrictVO;
			let block: SectorBlockVO;
			let allblocks: SectorBlockVO[] = [];
			for (let i = 0; i < SectorVO.SECTOR_DISTRICTS_TOTAL; i++) {
				// add new district to sector
				district = new SectorDistrictVO(i + 1, "District " + (i + 1).toString());
				vo.districts.push(district);

				// now, create blocks, adding them to respective districts
				for (let j = 0; j < SectorVO.SECTOR_TOTAL_BLOCKS / SectorVO.SECTOR_DISTRICTS_TOTAL; j++) {
					block = new SectorBlockVO(district, j + 1, NumberHelper.randomRange(1, 8))
					district.blocks.push(block);//addBlock(block);
					allblocks.push(block);
				}
			}
			// console.log("*", vo);
			let districtService = new SectorDistrictService();
			let blockService = new SectorBlockService();

			// for (let b of vo.districts)
			__this.create(vo, function (err: any, result: any) {
				if (err) return callback(err, null);
				console.log("* sector created");

				districtService.batchCreate(new SectorDistrictsSchema(), vo.districts, {}, function(err: any, result: any) {
					if (err) return callback(err, null);
					console.log("* districts created");

					blockService.batchCreate(new SectorBlocksSchema(), allblocks, {}, function(err: any, result: any) {
						if (err) return callback(err, null);
						console.log("* blocks created");
						return callback(null, result);
					});
				});
			});
			// console.log("**", vo.districts[3].toDatabase());
		});	
	}

	// getters & setters
}

export { SectorService };
