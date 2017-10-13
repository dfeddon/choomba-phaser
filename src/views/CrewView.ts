import { CharacterDataVO } from "../models/CharacterDataVO";
import CharacterView from "./CharacterViews";
import { CharacterVO } from "../models/CharactersVO";
import { VectorVO } from "../models/VectorsVO";

export default class CrewView extends Phaser.Group {

	attackGroup: Phaser.Group;
	defendGroup: Phaser.Group;
	private _bg: Phaser.TileSprite;
	private _ratio: number;
	worldscale: number;

	constructor(game: Phaser.Game, parent: any | null, name: string, addToStage?: boolean | false, enableBody?: boolean | false, physicsBodyType?: any) {
		console.log("== CrewView.constructor ==");
	
		super(game, parent, name, addToStage, enableBody, physicsBodyType);

		return this;
	}

	addCrew(crewArray: CharacterDataVO[], isLeft: boolean) {
		console.log("== CrewView.addCrew ==", crewArray, isLeft);
		var vectorX: number = 0;//15;
		if (!isLeft) {
			// start x value
			vectorX = 0;//400;
			// this.scale.x = -1;
		}
		var characterView: CharacterView;
		var lastVector: VectorVO = new VectorVO(vectorX, this.game.height / 3 * 2);

		for (var i = 0; i < crewArray.length; i++) {
			// create character view
			characterView = new CharacterView(this.game, new CharacterVO(crewArray[i].key, crewArray[i].name, new VectorVO(lastVector.x, lastVector.y)));
			// add character to group
			this.add(characterView);
			// update last vector by width of character
			lastVector.x = characterView.x + 125; //characterView.width;
    	}
	}
}
