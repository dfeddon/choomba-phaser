import { AbstractService } from "./AbstractService";
import { PlayersSchema } from "./Schemas/PlayersSchema";
import { Globals } from './Globals';
import { PlayerVO } from "../models/PlayersVO";
import { EntityService } from "./EntityService";
import { EntitiesSchema } from "./Schemas/EntitiesSchema";
import { EntityVO } from "../models/EntitiesVO";
import { CharactersSchema } from "./Schemas/CharactersSchema";
import { CharacterVO } from "../models/CharactersVO";

class CharacterService extends AbstractService {

	// privates

	// constructor
	constructor() {
		super();
	}

	// functions
	batchCreate(batch: CharacterVO[], callback: any): any {
		var i = batch.length;
		var array: CharacterVO[];
		function iterate(): any {
			this.create(batch[i], function(err: any, result: any) {
				if (err) return callback(err, null);
				// reduce iterator
				i--;
				// add new item to array
				array.push(new CharacterVO(result));
				// if done, return array
				if (i === 0) return callback(null, array);
			});
		}
		iterate();
	}
	
	// begin overrides super params (explicitly defining schema)
	findById(id: number, callback: any): any {
		super.findById(id, new PlayersSchema(), callback);
	}
	create(obj: CharacterVO, callback: any): any {
		super.create(new CharactersSchema(), obj, callback);
	}
	getAllByArray(ids: number[], schema: any, callback: any) {
		super.getAllByArray(ids, new CharactersSchema(), callback);
	}

	// end overrides

	createCharacterByRole(role: number) {

	}

	// getters & setters
}

export { CharacterService };
