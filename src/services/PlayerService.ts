import { AbstractService } from "./AbstractService";
import { PlayersSchema } from "./Schemas/PlayersSchema";
import { Globals } from './Globals';
import { PlayerVO } from "../models/PlayersVO";
import { EntityService } from "./EntityService";
import { EntitiesSchema } from "./Schemas/EntitiesSchema";
import { EntityVO } from "../models/EntitiesVO";

class PlayerService extends AbstractService {

	// privates

	// constructor
	constructor() {
		super();
	}

	// functions
	init(id: number, callback: any): any {
		let vo: PlayerVO;
		let json: any;
		this.findById(id, function (err: any, result: any) {
			if (err) return callback(err, null);
			// if (!result.id) return callback("Warning: player has no 'id'!", null);
			json = result;
			// cast player
			vo = new PlayerVO(result);
			// store player in singleton
			Globals.getInstance().player = vo;

			// get player entity
			new EntityService().init(result.entity, function(err: any, result: EntityVO) {
				if (err) return callback(err, null);
				// if (!result.id) return callback("Warning: player entity has no 'id'!", null);

				// asign entity to player
				vo.entity = new EntityVO(result);

				return callback(null, vo);
			});
			
		});
	}

	// override super params (explicitly defining schema)
	findById(id: number, callback: any): any {
		super.findById(id, new PlayersSchema(), callback);
	}

	createCharacterByRole(role: number) {
		
	}

	// getters & setters
}

export { PlayerService };
