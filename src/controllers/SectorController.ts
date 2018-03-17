import { VectorVO } from "../models/VectorsVO";
import { SectorVO } from "../models/SectorVO";
import { SectorBlockVO } from "../models/SectorBlockVO";
import { SectorDistrictVO } from "../models/SectorDistrictVO";
import { NumberHelper } from "../helpers/NumberHelper";
import { SectorService } from "../services/SectorService";
import { SectorsSchema } from "../services/Schemas/SectorsSchema";

class SectorController {

	constructor() {
		console.log("* SectorController constructor");
	}

	createSector() {
		console.log("* SectorController.createSector");
		new SectorService().createNewAndPopulate(function(err: any, result: any) {
			if (err) console.log("* error", JSON.stringify(err));
			else console.log("* success!");
		});
		/*return;
		let blockSize: number = 64;
		let totalBlocks: number = 64 * 64;
		let sectorSize: number = 64 * blockSize;
		let totalDistricts: number = totalBlocks / 256;//16; // (4 x 4 rows/columns => 16 total)
		let districtSize: number = totalDistricts / 16 * blockSize;
		// first, get total number of existing sectors
		let totalSectors = 0;
		// now, create sector new 
		let sector: SectorVO = new SectorVO("Sector " + (totalSectors + 1).toString(), totalBlocks / 2, totalBlocks / 2, blockSize, new VectorVO(0, 0));
		// next, create districts, adding them to sector
		var district: SectorDistrictVO;
		var block: SectorBlockVO;
		// sector.districts = [];
		for (let i = 0; i < totalDistricts; i++) {
			// add new district to sector
			district = new SectorDistrictVO("District " + (i + 1).toString(), i + 1, sectorSize, sectorSize, blockSize, new VectorVO(i * districtSize, i * districtSize));
			sector.districts.push(district);

			// now, create blocks, adding them to respective districts
			for (let j = 0; j < totalBlocks / totalDistricts; j++) {
				block = this.createSectorBlock(district, j + 1);// new SectorBlockVO(district);
				district.blocks.push(block);//addBlock(block);
			}
		}
		console.log('sector complete!');//sector);*/
	}

	// generate new sector blocks (random)
	createSectorBlock(district: SectorDistrictVO, index: number): SectorBlockVO {
		// console.log("* SectorController.createSectorBlock", district.index, index);

		let type: number = NumberHelper.randomRange(1, 8);
		let vo: SectorBlockVO = new SectorBlockVO(district, index, type);

		return vo;
	}

	assignSectorToEntity() {
		console.log("* SectorController.assignSectorToEntity");
	}
}

export { SectorController };
