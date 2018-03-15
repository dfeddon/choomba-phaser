import { VectorVO } from "../models/VectorsVO";
import { SectorVO } from "../models/SectorVO";
import { SectorBlockVO } from "../models/SectorBlockVO";

class SectorController {

	constructor() {
		console.log("* SectorController constructor");
	}

	createNewSector() {
		/*console.log("* SectorController.createNewSector");
		let totalBlocks: number = 64 * 64
		// first, create sector
		let newBlocks: SectorBlockVO[];
		// generate new chars (random)
		for (var i = 0; i < totalBlocks; i++) {
			console.log('* newChar push');
			newBlocks.push(new SectorBlockVO(1));//.createBlock(NumberHelper.randomRange(1, 8)).toObject());
		}
		// array to store new character ids
		var characterIds: number[] = [];
		// save to db
		for (let schema of newCharacters) {
			console.log("*****", typeof (schema), schema, typeof (characterIds));
			// add new character ids to array
			characterIds.push((schema as CharacterVO).id);
			// create new character
			AWS.dynamoose.create(new CharactersSchema(), schema, function (err: any, result: any) {
				if (err) console.log(err);
				else {
					console.log("%c## created: " + JSON.stringify(result), "color:lime");
					// add new char to global entity
					console.log("**pool");
					console.log("-", Globals.getInstance().player.entity);
					Globals.getInstance().player.entity.characterPool.push(result);
					// append character id's to existing entity schema...
					console.log("id", result.id);
					entity.characters.push(result.id);
				}
			});
		}*/
		
	}

	assignSectorToEntity() {

	}
}

export { SectorController };
