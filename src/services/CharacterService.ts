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
	
	// begin overrides super params (explicitly defining schema)
	findById(id: number, callback: any): any {
		super.findById(id, new PlayersSchema(), callback);
	}
	create(obj: CharacterVO, callback: any): any {
		super.create(obj, new CharactersSchema(), callback);
	}
	update(key: number, obj: object, callback: any) {
		super.update(key, obj, new CharactersSchema(), callback);
	}
	getAllByArray(ids: number[], callback: any) {
		super.getAllByArray(ids, new CharactersSchema(), callback);
	}
	batchCreate(items: any[], options: object, callback: any) {
		super.batchCreate(new CharactersSchema(), items, options, callback);
	}
	// end overrides

	createCharacterByRole(role: number) {

	}

	// getters & setters
}

export { CharacterService };
