import { AbstractService } from "./AbstractService";
import { EntitiesSchema } from "./Schemas/EntitiesSchema";
import { EntityVO } from "../models/EntitiesVO";
import { CharacterVO } from "../models/CharactersVO";
import { NumberHelper } from "../helpers/NumberHelper";
import { CharacterService } from "./CharacterService";
import { DynamooseService } from "./DynamooseService";

class EntityService extends AbstractService {

	// privates

	// constructor
	constructor() {
		super();
	}

	// functions
	init(id: number, callback: any) {
		let vo: EntityVO;
		// get player entity
		this.findById(id, function (err: any, result: any) {
			if (err) return callback(err, null);
			if (!result.id) return callback("Warning: player entity has no 'id'!", null);

			vo = new EntityVO(result);

			// assess array of players in entity
			if (!vo.characters) // <- don't have any, init array
				vo.characters = [];
			
			// TODO: STUB -- this *should be* defined in entity vo (eg: crewslots)
			let characterPoolLength: number = 10;

			if (vo.characters.length < characterPoolLength) {
				var newCharacters: CharacterVO[] = [];
				let dif: number = characterPoolLength - vo.characters.length;
				
				console.log("* need to generate", dif, "new characters");
				if (dif === characterPoolLength) {
					// new user, fill pool, ensuring entity has at least *one* role for each *position*
					console.log("* new char!");
					// frontline (tank [1], gcannon [2]) backline (healer [3], cleanser [4]) midline (aoe [6], dot [5], buff [7], debuff [8])
					// 1 frontline
					newCharacters.push(new CharacterVO().createCharacter(NumberHelper.randomRange(1, 2)));//.toObject());
					// 1 backline
					newCharacters.push(new CharacterVO().createCharacter(NumberHelper.randomRange(3, 4)));//.toObject());
					// 2 mid
					newCharacters.push(new CharacterVO().createCharacter(NumberHelper.randomRange(5, 6)));//.toObject());
					newCharacters.push(new CharacterVO().createCharacter(NumberHelper.randomRange(7, 8)));//.toObject());
					// subtrack them
					dif -= 4;
				}
			
				// generate new chars (random)
				for (var i = 0; i < dif; i++) {
					console.log('* newChar push');
					newCharacters.push(new CharacterVO().createCharacter(NumberHelper.randomRange(1, 8)));//.toObject());
				}
				// array to store new character ids
				var characterIds: number[] = [];
				// save to db
				/*new CharacterService().batchCreate(newCharacters, function(err: any, result: CharacterVO[]) {
					if (err) return callback(err, null);
					console.log("returned batch create characters", result);

					for (let char of result) {
						// add new character to pool
						vo.characterPool.push(char);
						// add new character id to characters
						vo.characters.push(char.id);
					}

					// first, let's concatentate the new character ids with the existing ids
					// let totalCharacters: number[] = vo.characters.concat()
					// append new character ids to existing entity.characters array
					this.update(vo.id, { characters: vo.characters }, DynamooseService.UPDATE_TYPE_PUT, function(err: any, result: any) {
						if (err) return callback(err, null);
						return callback(null, result);
					});
				});*/
			} else { // all slots filled, get existing characters from db
				new CharacterService().getAllByArray(vo.characters, new EntitiesSchema(), function(err: any, result: any) {
					if (err) return callback(err, null);
					vo.characterPool = result as CharacterVO[]
					return callback(null, vo);
				});
			}
		});
	}

	getCharacters() {

	}

	// override super params (explicitly defining schema)
	findById(id: number, callback: any): any {
		super.findById(id, new EntitiesSchema(), callback);
	}
	create(obj: EntityVO, callback: any): any {
		super.create(obj, new EntitiesSchema(), callback);
	}
	update(id: number, obj: EntityVO, type: number, callback: any) {
		super.update(id, obj, new EntitiesSchema(), callback);
	}
	getAllByArray(ids: number[], schema: any, callback: any) {
		super.getAllByArray(ids, new EntitiesSchema(), callback);
	}

	// getters & setters
}

export { EntityService };
