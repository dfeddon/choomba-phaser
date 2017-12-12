import { PlayerVO } from "../models/PlayersVO";
import { EntityVO } from "../models/EntitiesVO";

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
}

export {Globals};
