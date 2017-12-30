import { PlayerVO } from "../models/PlayersVO";
import { EntityVO } from "../models/EntitiesVO";
import { CharacterVO } from "../models/CharactersVO";
import * as _ from "lodash";

class Globals {
	private static instance: Globals;
	// public dynamoose: DynamooseService;
	public player: PlayerVO;
	// public entity: EntityVO;

	private constructor() {
	}

	static getInstance() {
		if (!Globals.instance) {
			Globals.instance = new Globals();
			// one-time init code here...
			console.log("&& There can be only one!");
		}

		return Globals.instance;
	}

	public getCrew(): CharacterVO[] {
		var pool: CharacterVO[] = [];
		for (let char of this.player.entity.characterPool) {
			if (char.position > 0)
				pool.push(char);
		}
		var crew: CharacterVO[] = _.orderBy(pool, "position");
		return crew;
	}
}

export {Globals};
