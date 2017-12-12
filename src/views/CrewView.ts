import { CharacterDataVO } from "../models/CharacterDataVO";
import CharacterView from "./CharacterViews";
import { CharacterVO } from "../models/CharactersVO";
import { VectorVO } from "../models/VectorsVO";

export default class CrewView extends Phaser.Sprite {

	static readonly PLAYER_MOVING_FORWARD: number = 1;
	static readonly PLAYER_MOVING_BACKWARD: number = 2;

	attackGroup: Phaser.Group;
	defendGroup: Phaser.Group;
	private _bg: Phaser.TileSprite;
	private _ratio: number;
	worldscale: number;
	currentState: number;
	isMobile: boolean;

	constructor(game: Phaser.Game, x: number, y: number, key: string, frame?: number) {
		console.log("== CrewView.constructor ==");
	
		super(game, x, y, key, frame);

		this.currentState = 0;
		this.isMobile = false;
		// game.physics.enable(this);
	    // game.add.existing(this);
		// return this;
	}

	created() {
		console.log("== CrewView.created() ==");
	}

	addCrewMembers(crewArray: CharacterDataVO[], isLeft: boolean) {
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
			characterView = new CharacterView(this.game, new CharacterVO());//crewArray[i].key, crewArray[i].name, new VectorVO(lastVector.x, lastVector.y)));
			// add character to group
			this.addChild(characterView);
			// update last vector by width of character
			lastVector.x = characterView.x + 125; //characterView.width;
    	}
	}

	setState(state: number) {
		// console.log("Crew.setCurrentState", state, this.children.length);
		if (state === this.currentState) return;

		this.currentState = state;

		for (var i = 0; i < this.children.length; i++) {
			// console.log(this.children[i] as CharacterView);
			(this.children[i] as CharacterView).setState(state);
		}

		// move crew
		// switch(state) {
		// 	case 0: this.body.velocity.x = 0; break;
		// 	case 1: this.body.velocity.x = 150; break;
		// 	case 2: this.body.velocity.x = -150; break;
		// }


	}
}
