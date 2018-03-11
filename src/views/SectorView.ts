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
	uiGroup: Phaser.Group;
	player: Phaser.Sprite;
	b1Sprite: Phaser.Sprite;
	totalBlocksX: number;
	totalBlocksY: number;

	// constructor(game: Phaser.Game, parent?: PIXI.DisplayObjectContainer, name?: string, addToStage?: boolean, enableBody?: boolean, physicsBodyType?: number) {
	constructor(game: Phaser.Game, x: number, y: number, key?: string, totalBlocksX?: number, totalBlocksY?: number) {
		console.log("== SectorView.constructor ==", x, y, key);

		super(game, x, y, key);//game, parent, name, addToStage, enableBody, physicsBodyType);
		this.totalBlocksX = totalBlocksX;
		this.totalBlocksY = totalBlocksY;
		// this.currentState = 0;
		// this.isMobile = false;
		// game.physics.enable(this);
		// game.add.existing(this);
		this.created();
		// return this;
	}

	created() {
		console.log("== SectorView.created() ==", this);

		// grid group
		this.gridGroup = this.game.make.group();
		this.gridGroup.inputEnableChildren = true;
		this.gridGroup.ignoreChildInput = false;
		this.gridGroup.onChildInputDown.add(this.clickHandler, this);

		// player fov
		let player: Phaser.Graphics = this.game.add.graphics(0, 0);
		player.drawCircle(0, 0, 10);
		this.player = this.game.add.sprite(0, 0, player.generateTexture());
		this.player.anchor.setTo(0.5, 0.5);
		// this.game.add.sprite(0, 0, this.player.key);//(0, 0, this.player.key);
		// this.game.physics.p2.enable(this.player);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.game.camera.follow(this.player);
		
		// UI group
		this.uiGroup = this.game.make.group();
		this.uiGroup.fixedToCamera = true;
		this.uiGroup.inputEnableChildren = true;
		this.uiGroup.ignoreChildInput = false;
		// this.uiGroup.onChildInputDown.add(this.clickHandler, this);		

		// add nav
		let compass: Phaser.Graphics = this.game.make.graphics(0, 0);
		let compassSize: number = 100;
		let compassPadding: number = 50;
		compass.lineStyle(1, 0x121f1f, 1);
		compass.beginFill(0x121f1f, 1);
		compass.drawCircle(0, 0, compassSize);
		compass.endFill();
		compass.x = compassSize;// + compassPadding;
		compass.y = window.innerHeight - compassSize;// - compassPadding;

		compass.inputEnabled = true;
		compass.input.useHandCursor = true;
		compass.events.onInputDown.add(this.compassClickHandler, this);

		// add scale
		let zoom: Phaser.Graphics = this.game.make.graphics(0, 0);
		let zoomSize: number = 50;
		let zoomPadding: number = 50;
		zoom.lineStyle(1, 0x121f1f, 1);
		zoom.beginFill(0x121f1f, 1);
		zoom.drawCircle(0, 0, zoomSize);
		zoom.endFill();
		zoom.x = zoomSize;// + zoomPadding;
		zoom.y = window.innerHeight - zoomSize;// - zoomPadding;

		zoom.inputEnabled = true;
		zoom.input.useHandCursor = true;
		zoom.events.onInputDown.add(this.zoomClickHandler, this);

		// this.inputEnabled = false;
		// this.width = 300;
		// this.height = 300;
		// this.events.onInputDown.add(this.clickHandler, this);

		// let graphics: Phaser.Graphics = this.game.add.graphics(0, 0);
		let size: number = 50;
		let padding: number = 5;
		// let maxWidth: number = Math.floor(this.game.width / size);
		// let total: number = 2500;//Math.floor(this.game.height / 100) * Math.floor(this.game.width / 100);
		let row: number = 0;
		let posX: number = 0;
		let posY: number = 0;

		// add sector
		// this.game.add(sector);
		// create block sprite
		let blockRec: Phaser.Graphics = this.game.make.graphics(0, 0);
		blockRec.lineStyle(1, 0x121f1f, 1);
		// blockRec.beginFill(0x121f1f, 1);
		blockRec.drawRect(0, 0, size, size);
		// blockRec.endFill();
		let blockSprite: Phaser.Sprite = this.game.make.sprite(0, 0, blockRec.generateTexture());
		blockSprite.inputEnabled = false;
		blockRec.destroy();

		// create building 1
		let b1Rec: Phaser.Graphics = this.game.make.graphics(0, 0);
		b1Rec.lineStyle(1, 0x121f1f, 1);
		b1Rec.beginFill(0x121f1f, 1);
		b1Rec.drawRect(0, 0, 5, 10);
		b1Rec.endFill();
		this.b1Sprite = this.game.make.sprite(0, 0, b1Rec.generateTexture());
		this.b1Sprite.inputEnabled = false;
		b1Rec.destroy();
		// create building 1
		let blockCircle: Phaser.Graphics = this.game.make.graphics(0, 0);
		blockCircle.lineStyle(1, 0x121f1f, 1);
		blockCircle.beginFill(0x121f1f, 1);
		blockCircle.drawCircle(0, 0, 10);
		blockCircle.endFill();
		let circleSprite: Phaser.Sprite = this.game.make.sprite(0, 0, blockCircle.generateTexture());
		circleSprite.inputEnabled = false;
		blockCircle.destroy();
		// create car (vert)
		let blockCarVert: Phaser.Graphics = this.game.make.graphics(0, 0);
		blockCarVert.lineStyle(2, 0x121f1f, 0.5);
		blockCarVert.drawRect(0, 0, 10, 1);
		let carSpriteH: Phaser.Sprite = this.game.make.sprite(0, 0, blockCarVert.generateTexture());
		carSpriteH.inputEnabled = false;
		// create car (horiz)
		let blockCarHor: Phaser.Graphics = this.game.make.graphics(0, 0);
		blockCarHor.lineStyle(2, 0x121f1f, 0.5);
		blockCarHor.drawRect(0, 0, 1, 10);
		let carSpriteV: Phaser.Sprite = this.game.make.sprite(0, 0, blockCarHor.generateTexture());
		carSpriteV.inputEnabled = false;

		// block style
		let totalGrids = this.totalBlocksX * this.totalBlocksY; // 50 x 50
		let r = Math.sqrt(totalGrids) - 1;

		for (let i = 0; i < totalGrids; i++) {
			// console.log("* row", row);
			if (row === r) {
				posY += size + padding;
				row = 0;
			}
			else row++;

			posX = row * size + (padding * row);

			// draw block
			this.gridGroup.create(posX, posY, blockSprite.key);

			// add building
			/*
			this.gridGroup.create(posX + 5, posY + 5, b1Sprite.key);
			this.gridGroup.create(posX + 15, posY + 5, b1Sprite.key);
			this.gridGroup.create(posX + 25, posY + 5, circleSprite.key);
			this.gridGroup.create(posX + 40, posY + 5, b1Sprite.key);
			/*
			this.gridGroup.create(posX + 5, posY + 35, b1Sprite.key);
			this.gridGroup.create(posX + 15, posY + 35, b1Sprite.key);
			this.gridGroup.create(posX + 25, posY + 35, circleSprite.key);
			this.gridGroup.create(posX + 40, posY + 35, b1Sprite.key);
			//*/

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
			emitter = this.gridGroup.add(this.game.add.emitter(j * 53 + (j - 1) + j, 0, 300));

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
			emitter = this.gridGroup.add(this.game.add.emitter(0, j * 53 + (j - 1) + j, 300));

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
		this.gridGroup.rotation = 0.25;

		// add UI over grid items
		this.uiGroup.add(compass);
		this.uiGroup.add(zoom);
		console.log("* sprite w/h", this.gridGroup.width, this.gridGroup.height);

	}

	compassClickHandler(e: any, p: Phaser.Point) {
		console.log("* compass clicked", e, p);
		let hitX = e.position.x - e.input.downPoint.x;
		let hitY = e.position.y - e.input.downPoint.y;
		let dir: number = 4; // 1 up, 2 down, 3 left, 4 right
		if (hitX > 0) {
			// console.log("* left", hitX, 'y', hitY);
			if (hitY > 0) {
				// console.log("* up", hitY);
				if (Math.abs(hitY) > Math.abs(hitX))
					dir = 1;
				else dir = 3;
			}
			else {
				// console.log("* down", hitY);
				if (Math.abs(hitY) > Math.abs(hitX))
					dir = 2;
				else dir = 3;
			}
		}
		else {
			// console.log("* right", hitX, 'y', hitY);
			if (hitY > 0) {
				// console.log("* up", hitY);
				if (Math.abs(hitY) > Math.abs(hitX))
					dir = 1;
			}
			else {
				// console.log("* down", hitY);
				if (Math.abs(hitY) > Math.abs(hitX))
					dir = 2;
			}
		}

		// console.log("* dir", dir);
		let stepper: number = 250;
		switch(dir) {
			case 1: // up
				// this.game.add.tween(this.gridGroup).to({ y: this.gridGroup.y + stepper }, 500, Phaser.Easing.Quadratic.InOut, true);
				// this.game.camera.y -= stepper;
				this.player.y -= stepper;
			break;

			case 2: // down
				// this.game.add.tween(this.gridGroup).to({ y: this.gridGroup.y - stepper }, 500, Phaser.Easing.Quadratic.InOut, true);
				// this.game.camera.y += stepper;
				this.player.y += stepper;
			break;

			case 3: // left
				// this.game.add.tween(this.gridGroup).to({ x: this.gridGroup.x + stepper }, 500, Phaser.Easing.Quadratic.InOut, true);
				// this.game.camera.x -= stepper;
				this.player.x -= stepper;
			break;

			case 4: // right
				// this.game.add.tween(this.gridGroup).to({ x: this.gridGroup.x - stepper }, 500, Phaser.Easing.Quadratic.InOut, true);
				// this.game.camera.x += stepper;
				this.player.x += stepper;
			break;
		}
		console.log("* player", this.player.x, this.player.y);
	}

	zoomClickHandler(e: Phaser.Graphics, p: Phaser.Point) {
		console.log("* sector click handler", e, p);
		if (this.gridGroup.scale.x === 1)
			this.gridGroup.scale.set(2, 2);
		else this.gridGroup.scale.set(1, 1);
	}

	clickHandler(e: SectorView, p: Phaser.Point) {
		console.log("* sector click handler", e, p);
		e.loadTexture(this.b1Sprite.key);
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
