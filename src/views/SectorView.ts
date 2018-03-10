// import { CharacterDataVO } from "../models/CharacterDataVO";
import CharacterView from "./CharacterViews";
import { CharacterVO } from "../models/CharactersVO";
import { VectorVO } from "../models/VectorsVO";
import * as _ from "lodash";

class SectorView extends Phaser.Sprite {

	// static readonly PLAYER_MOVING_FORWARD: number = 1;
	// static readonly PLAYER_MOVING_BACKWARD: number = 2;

	// private _bg: Phaser.TileSprite;
	// private _ratio: number;

	// attackGroup: Phaser.Group;
	// defendGroup: Phaser.Group;
	// worldscale: number;
	// currentState: number;
	// isMobile: boolean;
	gridGroup: Phaser.Group;

	// constructor(game: Phaser.Game, parent?: PIXI.DisplayObjectContainer, name?: string, addToStage?: boolean, enableBody?: boolean, physicsBodyType?: number) {
	constructor(game: Phaser.Game, x: number, y: number, key?: string) {
		console.log("== SectorView.constructor ==", x, y, key);

		super(game, x, y, key);//game, parent, name, addToStage, enableBody, physicsBodyType);
		// this.currentState = 0;
		// this.isMobile = false;
		// game.physics.enable(this);
		// game.add.existing(this);
		this.created();
		// return this;
	}

	created() {
		console.log("== SectorView.created() ==", this);

		this.gridGroup = this.game.make.group();
		this.gridGroup.inputEnableChildren = true;
		this.gridGroup.ignoreChildInput = false;
		this.gridGroup.onChildInputDown.add(this.clickHandler, this);

		// this.inputEnabled = false;
		// this.width = 300;
		// this.height = 300;
		// this.events.onInputDown.add(this.clickHandler, this);

		// let graphics: Phaser.Graphics = this.game.add.graphics(0, 0);
		let size: number = 50;
		let padding: number = 5;
		// let maxWidth: number = Math.floor(this.game.width / size);
		let total: number = 2500;//Math.floor(this.game.height / 100) * Math.floor(this.game.width / 100);
		let row: number = 0;
		let posX: number = 0;
		let posY: number = 0;

		// add sector
		// this.game.add(sector);
		// create block sprite
		let blockRec: Phaser.Graphics = this.game.add.graphics(0, 0);
		blockRec.lineStyle(1, 0x121f1f, 1);
		// blockRec.beginFill(0x121f1f, 1);
		blockRec.drawRect(0, 0, size, size);
		// blockRec.endFill();
		let blockSprite: Phaser.Sprite = this.game.add.sprite(0, 0, blockRec.generateTexture());
		blockSprite.inputEnabled = false;
		blockRec.destroy();

		// create building 1
		let b1Rec: Phaser.Graphics = this.game.add.graphics(0, 0);
		b1Rec.lineStyle(1, 0x121f1f, 1);
		b1Rec.beginFill(0x121f1f, 1);
		b1Rec.drawRect(0, 0, 5, 10);
		b1Rec.endFill();
		let b1Sprite: Phaser.Sprite = this.game.add.sprite(0, 0, b1Rec.generateTexture());
		b1Sprite.inputEnabled = false;
		b1Rec.destroy();
		// create building 1
		let blockCircle: Phaser.Graphics = this.game.add.graphics(0, 0);
		blockCircle.lineStyle(1, 0x121f1f, 1);
		blockCircle.beginFill(0x121f1f, 1);
		blockCircle.drawCircle(0, 0, 30);
		blockCircle.endFill();
		let circleSprite: Phaser.Sprite = this.game.add.sprite(0, 0, blockCircle.generateTexture());
		circleSprite.inputEnabled = false;
		blockCircle.destroy();
		// create car (vert)
		let blockCarVert: Phaser.Graphics = this.game.add.graphics(0, 0);
		blockCarVert.lineStyle(2, 0x121f1f, 0.5);
		blockCarVert.drawRect(0, 0, 10, 1);
		let carSpriteH: Phaser.Sprite = this.game.add.sprite(0, 0, blockCarVert.generateTexture());
		carSpriteH.inputEnabled = false;
		// create car (horiz)
		let blockCarHor: Phaser.Graphics = this.game.add.graphics(0, 0);
		blockCarHor.lineStyle(2, 0x121f1f, 0.5);
		blockCarHor.drawRect(0, 0, 1, 10);
		let carSpriteV: Phaser.Sprite = this.game.add.sprite(0, 0, blockCarHor.generateTexture());
		carSpriteV.inputEnabled = false;

		// block style
		// graphics.lineStyle(2, 0x121f1f, 1);
		for (let i = 0; i < 2500; i++) {
			if (i !== 0 && i % 50 === 0) {
				posY += size + padding;
				row = 0;
			}
			else row++;

			posX = row * size + (padding * row);

			// draw block
			// graphics.drawRect(posX, posY, size, size);
			// this.game.add.sprite(posX, posY, blockSprite.key);
			if (posX < window.innerWidth && posY < window.innerHeight)
				this.gridGroup.create(posX, posY, blockSprite.key);
			// else console.log("skipping...");

			// add building
			/*this.game.add.sprite(posX + 5, posY + 5, b1Sprite.key);
			this.game.add.sprite(posX + 15, posY + 5, b1Sprite.key);
			this.game.add.sprite(posX + 25, posY + 5, circleSprite.key);
			this.game.add.sprite(posX + 40, posY + 5, b1Sprite.key);

			this.game.add.sprite(posX + 5, posY + 35, b1Sprite.key);
			this.game.add.sprite(posX + 15, posY + 35, b1Sprite.key);
			this.game.add.sprite(posX + 25, posY + 35, circleSprite.key);
			this.game.add.sprite(posX + 40, posY + 35, b1Sprite.key);//*/

			// this.game.add.sprite(posX + 5, posY + 45, b1Sprite.key);
			// this.game.add.sprite(posX + 15, posY + 45, b1Sprite.key);
			// this.game.add.sprite(posX + 25, posY + 45, circleSprite.key);
			// this.game.add.sprite(posX + 40, posY + 45, b1Sprite.key);

			// add buildings
			// graphics.lineStyle(0);
			// graphics.beginFill(0xFFFF0B, 0.5);
			// graphics.drawCircle(posX + 25, posY + 25, 20);
			// graphics.drawRect(posX + 5, posY + 5, 20, 20);
			// graphics.endFill();
		}

		// cars
		var emitter;
		var ex: number = 53;
		var speed: number;
		var freq: number;
		var cols: number = Math.ceil(window.innerWidth / 53);
		var rows: number = Math.ceil(window.innerHeight / 53);
		for (var j = 1; j < cols; j++) {
			speed = this.game.rnd.integerInRange(350, 550);
			emitter = this.game.add.emitter(j * 53 + (j - 1) + j, 0, 300);

			emitter.makeParticles(carSpriteV.key);
			emitter.width = 1;//window.innerWidth;

			emitter.minParticleScale = 1;
			emitter.maxParticleScale = 1;
			
			var sp
			emitter.setYSpeed(speed, speed); // 150 - 550
			emitter.setXSpeed(0, 0);

			emitter.minRotation = 0;
			emitter.maxRotation = 0;
			
			freq = this.game.rnd.integerInRange(250, 100);
			emitter.start(false, 8000, freq, 0);
		}
		for (var j = 1; j < rows; j++) {
			speed = this.game.rnd.integerInRange(350, 550);
			emitter = this.game.add.emitter(0, j * 53 + (j - 1) + j, 300);

			emitter.makeParticles(carSpriteH.key);
			emitter.width = 1;//window.innerWidth;

			emitter.minParticleScale = 1;
			emitter.maxParticleScale = 1;

			emitter.gravity.x = 0;
			emitter.gravity.y = 0;
			emitter.setXSpeed(speed, speed); // 150 - 550
			emitter.setYSpeed(0, 0);

			emitter.minRotation = 0;
			emitter.maxRotation = 0;

			freq = this.game.rnd.integerInRange(250, 100);
			emitter.start(false, 8000, freq, 0);
		}
		// this.gridGroup.onChildInputDown.add(this.clickHandler, this);

	}

	clickHandler(e: SectorView, p: Phaser.Point) {
		console.log("* sector click handler", e, p);
	}

	// setState(state: number) {
	// 	// console.log("Crew.setCurrentState", state, this.children.length);
	// 	if (state === this.currentState) return;

	// 	this.currentState = state;

	// 	for (var i = 0; i < this.children.length; i++) {
	// 		// console.log(this.children[i] as CharacterView);
	// 		(this.children[i] as CharacterView).setState(state);
	// 	}

	// 	// move crew
	// 	// switch(state) {
	// 	// 	case 0: this.body.velocity.x = 0; break;
	// 	// 	case 1: this.body.velocity.x = 150; break;
	// 	// 	case 2: this.body.velocity.x = -150; break;
	// 	// }


	// }
}

export { SectorView };
