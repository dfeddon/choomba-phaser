import CharacterView from "./CharacterViews";
import { CharacterVO } from "../models/CharactersVO";
import { VectorVO } from "../models/VectorsVO";
import * as _ from "lodash";

class BuildingFactoryView extends Phaser.Sprite {

	public static readonly BUILDING_TYPE_STANDARD: number = 1;
	public static readonly BUILDING_TYPE_EMPTY: number = 2;

	constructor(game: Phaser.Game, x: number, y: number, key?: string) {
		super(game, x, y, key);

		this.inputEnabled = true;
	}

	getBuilding(type: number): Phaser.Sprite {
		switch(type) {
			case BuildingFactoryView.BUILDING_TYPE_STANDARD:
				return this.getStandard();
			case BuildingFactoryView.BUILDING_TYPE_EMPTY:
				return this.getEmptyBlock();
		}
	}

	getEmptyBlock(): Phaser.Sprite {
		let x: Phaser.Graphics = this.game.make.graphics(0, 0);
		x.lineStyle(1, 0x121f1f, 1);
		// blockRec.beginFill(0x121f1f, 1);
		x.drawRect(0, 0, 64, 64);
		let sprite: Phaser.Sprite = this.game.make.sprite(0, 0, x.generateTexture());
		sprite.inputEnabled = false;
		// blockSprite.autoCull = true; // optimize
		// blockSprite.checkWorldBounds = true; // optimize
		sprite.body = null; // optimize
		x.destroy();

		return sprite;
	}

	getStandard(): Phaser.Sprite {
		
		let x: Phaser.Graphics = this.game.make.graphics(0, 0);
		x.lineStyle(1, 0x121f1f, 0.32);
		x.drawRect(0, 0, 32, 32);

		x.lineStyle(1, 0x121f1f, 1);
		x.beginFill(0x121f1f, 1);
		x.drawRect(0, 0, 30, 30);
		x.endFill();

		x.lineStyle(1, 0x121f1f, 1);
		x.beginFill(0x121f1f, 1);
		x.drawRect(32, 0, 30, 30);
		x.endFill();

		x.lineStyle(1, 0x121f1f, 1);
		x.beginFill(0x121f1f, 1);
		x.drawRect(0, 32, 30, 30);
		x.endFill();

		x.lineStyle(1, 0x121f1f, 1);
		x.beginFill(0x121f1f, 1);
		x.drawRect(32, 32, 30, 30);
		x.endFill();

		var sprite: Phaser.Sprite = this.game.make.sprite(0, 0, x.generateTexture());
		sprite.inputEnabled = false;
		// sprite.autoCull = true; // optimize (if set *only* when offscreen)
		// sprite.checkWorldBounds = true; // optimize
		sprite.body = null; // optimize
		x.destroy();
		return sprite;
	}
}

export { BuildingFactoryView }