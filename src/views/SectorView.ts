// import { CharacterDataVO } from "../models/CharacterDataVO";
import CharacterView from "./CharacterViews";
import { CharacterVO } from "../models/CharactersVO";
import { VectorVO } from "../models/VectorsVO";
import { BuildingFactoryView } from "../views/BuildingFactoryView";
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
	emitterGroup: Phaser.Group;
	uiGroup: Phaser.Group;
	fov: Phaser.Sprite;
	b1Sprite: Phaser.Sprite;
	compass: Phaser.Graphics;
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

		// emitter group
		this.emitterGroup = this.game.add.group();
		this.emitterGroup.fixedToCamera = true;
		this.emitterGroup.cameraOffset.x = 17.5; // <- wtf?
		this.emitterGroup.cameraOffset.y = -7;
		this.emitterGroup.inputEnableChildren = false;
		this.emitterGroup.ignoreChildInput = true;
		// set camera offset to the diff between screen and camera (64)
		// console.log("* dif", window.innerWidth, this.game.camera.width, this.game.width);
		let dif = Math.ceil(window.innerWidth / 64) * 64 - window.innerWidth;
		// console.log("* dif final", dif);

		// fov fov
		let fov: Phaser.Graphics = this.game.make.graphics(0, 0);
		// fov.beginFill(0xffffff, 1);
		fov.lineStyle(1, 0x9dd7e7, 1);
		// blockRec.beginFill(0x121f1f, 1);
		fov.drawRect(0, 0, 64, 64);
		fov.endFill();
		this.fov = this.game.add.sprite(32, 32, fov.generateTexture());
		this.fov.anchor.setTo(0.5, 0.5);
		// this.game.add.sprite(0, 0, this.fov.key);//(0, 0, this.fov.key);
		// this.game.physics.p2.enable(this.fov);
		// this.game.physics.startSystem(Phaser.Physics.ARCADE);
		// this.game.physics.enable(this.fov, Phaser.Physics.ARCADE);
		this.game.camera.follow(this.fov);
		
		// UI group
		this.uiGroup = this.game.make.group();
		this.uiGroup.fixedToCamera = true;
		this.uiGroup.inputEnableChildren = true;
		this.uiGroup.ignoreChildInput = false;
		// this.uiGroup.onChildInputDown.add(this.clickHandler, this);		

		// add nav
		this.compass = this.game.make.graphics(0, 0);
		let compassSize: number = 100;
		let compassPadding: number = 50;
		this.compass.lineStyle(1, 0x121f1f, 1);
		this.compass.beginFill(0x121f1f, 1);
		this.compass.drawCircle(0, 0, compassSize);
		this.compass.endFill();
		this.compass.x = compassSize;// + compassPadding;
		this.compass.y = window.innerHeight - compassSize;// - compassPadding;

		this.compass.inputEnabled = true;
		this.compass.input.useHandCursor = true;
		this.compass.events.onInputDown.add(this.compassClickHandler, this);

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
		let size: number = 64;
		let padding: number = 5;
		// let maxWidth: number = Math.floor(this.game.width / size);
		// let total: number = 2500;//Math.floor(this.game.height / 100) * Math.floor(this.game.width / 100);
		let row: number = 0;
		let posX: number = 0;
		let posY: number = 0;

		// add sector
		// this.game.add(sector);
		// create block sprite
		//*
		let blockRec: Phaser.Graphics = this.game.make.graphics(0, 0);
		blockRec.lineStyle(1, 0x121f1f, 1);
		// blockRec.beginFill(0x121f1f, 1);
		blockRec.drawRect(0, 0, size, size);
		// blockRec.endFill();
		let blockSprite: Phaser.Sprite = this.game.make.sprite(0, 0, blockRec.generateTexture());
		blockSprite.inputEnabled = false;
		// blockSprite.autoCull = true; // optimize
		// blockSprite.checkWorldBounds = true; // optimize
		blockSprite.body = null; // optimize
		blockRec.destroy();//*/

		// random building pool
		let rndBuilding: Phaser.Sprite[] = [];
		// empty block
		let bdgEmpty: Phaser.Sprite = new BuildingFactoryView(this.game, 0, 0).getBuilding(BuildingFactoryView.BUILDING_TYPE_EMPTY);
		rndBuilding.push(bdgEmpty);
		// create building 1
		let bdgStandard: Phaser.Sprite = new BuildingFactoryView(this.game, 0, 0).getBuilding(BuildingFactoryView.BUILDING_TYPE_STANDARD);
		rndBuilding.push(bdgStandard);

		// b1Sprite.inputEnabled = false;
		// b1Rec.destroy();
		// create building 1
		// let blockCircle: Phaser.Graphics = this.game.make.graphics(0, 0);
		// blockCircle.lineStyle(1, 0x121f1f, 1);
		// blockCircle.beginFill(0x121f1f, 1);
		// blockCircle.drawCircle(0, 0, 10);
		// blockCircle.endFill();
		// let circleSprite: Phaser.Sprite = this.game.make.sprite(0, 0, blockCircle.generateTexture());
		// circleSprite.inputEnabled = false;
		// blockCircle.destroy();

		// create car (vert)
		let carColor:number = 0x384b4b;
		let blockCarVert: Phaser.Graphics = this.game.make.graphics(0, 0);
		blockCarVert.lineStyle(2, carColor, 0.75);
		blockCarVert.drawRect(0, 0, 10, 1);
		let carSpriteH: Phaser.Sprite = this.game.make.sprite(0, 0, blockCarVert.generateTexture());
		carSpriteH.inputEnabled = false;
		blockCarVert.destroy();
		// create car (horiz)
		let blockCarHor: Phaser.Graphics = this.game.make.graphics(0, 0);
		blockCarHor.lineStyle(2, carColor, 0.75);
		blockCarHor.drawRect(0, 0, 1, 10);
		let carSpriteV: Phaser.Sprite = this.game.make.sprite(0, 0, blockCarHor.generateTexture());
		carSpriteV.inputEnabled = false;
		blockCarHor.destroy();

		// block style
		let totalGrids = this.totalBlocksX * this.totalBlocksY; // 64 x 64
		totalGrids = totalGrids / 4;
		let r = Math.sqrt(totalGrids) - 1;

		// this.gridGroup.rotation = 0.25;

		for (let i = 0; i < totalGrids; i++) {
			// console.log("* row", row);
			if (row === r) {
				posY += size + padding;
				row = 0;
			}
			else row++;

			posX = row * size + (padding * row);

			// draw block
			// console.log(rndBuilding.length - 1);
			this.gridGroup.create(posX, posY, rndBuilding[this.game.rnd.integerInRange(0, rndBuilding.length - 1)].key);
			// this.gridGroup.create(posX, posY, bdgEmpty.key);

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
		let emitter: Phaser.Particles.Arcade.Emitter;
		let exy: number = 67; // emitter x/y val
		let speed: number;
		let freq: number;
		let duration: number;
		let cols: number = this.totalBlocksY;
		let rows: number = this.totalBlocksX;

		let longest: number = (window.innerWidth > window.innerHeight) ? window.innerWidth : window.innerHeight;
		let totalCarEmitters: number = Math.ceil(longest / 64);
		// console.log("* longest", longest, totalCarEmitters, rows, cols);
		for (var j = 1; j < totalCarEmitters; j++) {
			speed = this.game.rnd.integerInRange(350, 550);
			emitter = this.emitterGroup.add(this.game.add.emitter(j * exy + (j - 3) + j + this.game.camera.x, this.game.camera.y, 1));//300));
			console.log("* emitX", emitter.x, emitter.y);
			// emitter.fixedToCamera = true;

			emitter.makeParticles(carSpriteV.key);
			emitter.width = 1;//window.innerWidth;

			emitter.minParticleScale = 1;
			emitter.maxParticleScale = 1;
			
			emitter.setYSpeed(speed, speed); // 350 - 550
			emitter.setXSpeed(0, 0);

			emitter.minRotation = 0;
			emitter.maxRotation = 0;
			
			duration = (this.totalBlocksX * 64) / speed * 1000;
			freq = this.game.rnd.integerInRange(2500, 10000);
			emitter.start(false, duration, freq, 0, false);
		}
		for (var j = 1; j < totalCarEmitters; j++) {
			speed = this.game.rnd.integerInRange(350, 550);
			emitter = this.emitterGroup.add(this.game.add.emitter(this.game.camera.x, j * exy + (j - 1) + j + this.game.camera.y, 1));//300));
			console.log("* emitY", emitter.x, emitter.y);
			// emitter.fixedToCamera = true;

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

			duration = (this.totalBlocksX * 64) / speed * 1000;
			freq = this.game.rnd.integerInRange(2500, 10000);
			emitter.start(false, duration, freq, 0, false); // TODO: replace 800 with accurate width / speed * 1000
		}
		// this.gridGroup.onChildInputDown.add(this.clickHandler, this);
		// this.gridGroup.rotation = 0.25;

		// adjust emitter group x/y
		// console.log("===================", this.x, this.gridGroup.x, this.emitterGroup.x, this.game.camera);

		// add UI over grid items
		// this.uiGroup.add(this.compass);
		this.uiGroup.add(zoom);
		// console.log("* sprite w/h", this.gridGroup.width, this.gridGroup.height);

	}

	compassClickHandler(e: any, p: Phaser.Point) {
		// console.log("* compass clicked", e, p);

		/*this.compass.inputEnabled = false;
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
		let t: Phaser.Tween;
		switch(dir) {
			case 1: // up
				t = this.game.add.tween(this.fov).to({ y: this.fov.y - stepper }, 250, Phaser.Easing.Quadratic.InOut, true);
			break;

			case 2: // down
				t = this.game.add.tween(this.fov).to({ y: this.fov.y + stepper }, 250, Phaser.Easing.Quadratic.InOut, true);
			break;

			case 3: // left
				t = this.game.add.tween(this.fov).to({ x: this.fov.x - stepper }, 250, Phaser.Easing.Quadratic.InOut, true);
			break;

			case 4: // right
				t = this.game.add.tween(this.fov).to({ x: this.fov.x + stepper }, 250, Phaser.Easing.Quadratic.InOut, true);
			break;
		}
		t.onComplete.add(this.fovCompleteHandler, this);*/
	}

	fovCompleteHandler(a: any, b: any) {
		// console.log("**", a, b);
		this.compass.inputEnabled = true;
	}

	zoomClickHandler(e: Phaser.Graphics, p: Phaser.Point) {
		console.log("* sector click handler", e, p);
		// let scaleTo: number = 1;
		if (this.gridGroup.scale.x === 1)
			this.gridGroup.scale.set(2, 2);
		else this.gridGroup.scale.set(1, 1);
		/*
		let zoomAmount = 1;
		this.game.camera.scale.x += zoomAmount;
		this.game.camera.scale.y += zoomAmount;
		*/
		this.game.camera.bounds.x = 0;//window.innerWidth.x * this.game.camera.scale.x;
		this.game.camera.bounds.y = 0;//window.innerHeight.y * this.game.camera.scale.y;
		this.game.camera.bounds.width = (this.totalBlocksX * 64) * this.gridGroup.scale.x + ((this.totalBlocksX * 64) / 4);
		this.game.camera.bounds.height = (this.totalBlocksY * 64) * this.gridGroup.scale.y + ((this.totalBlocksY * 64) / 4);
		//*/
	}

	pointFromAngle(px: number, py: number): object {
		console.log("* was", px, py);
		// let a = this.gridGroup.rotation * Math.PI / 180;
		let a = this.gridGroup.rotation;// + 180;
		// var length = this.gridGroup.width;// 150;
		var realAngle = (this.gridGroup.parent as Phaser.Sprite).angle + 180;
		console.log("* angle", a, realAngle);
		var radians = realAngle * Math.PI / 180;
		console.log("* radians", radians);
		var x = px + (Math.cos(radians) * (px + 64));
		var y = py + (Math.sin(radians) * 64);
		console.log("* is", x, y, ': diff', px - x, py - y);		
		return { x: x, y: y};
	}

	clickHandler(e: SectorView, p: Phaser.Point) {
		console.log("* sector click handler", e, p);
		console.log("* bounds offset", this.game.world.bounds.x, this.game.world.bounds.y);
		this.fov.alpha = 0;
		this.emitterGroup.visible = false;
		// let offsetX: number = 0;//64 / 2;
		// let offsetY: number = 0;//64 / 2;
		// console.log("* rot", this.gridGroup.rotation);
		// var coord: any = this.pointFromAngle(e.centerX, e.centerY);
		// offsetY = Math.cos(this.gridGroup.rotation) * e.position.y;
		// e.loadTexture(this.b1Sprite.key);
		// this.game.camera.focusOnXY(p.x, p.y);
		// this.game.camera.lerp = new Phaser.Point(0.1, 0.1);
		// this.game.camera.view.centerOn(e.position.x, e.position.y);
		// console.log("* rot", offsetY);//e.position.x * this.gridGroup.rotation, e.position.y * this.gridGroup.rotation);
		this.game.add.tween(this.fov).to({ x: e.centerX, y: e.centerY }, 500, Phaser.Easing.Quadratic.InOut, true);
		let t: Phaser.Tween = this.game.add.tween(this.fov).to({ alpha: 1 }, 650, "Linear", true);
		t.onComplete.add(this.mapMoveCompleteHandler, this)
	}

	mapMoveCompleteHandler(e: Phaser.Sprite, p: Phaser.Point) {
		console.log("* mapMoveComplete", e, p);
		console.log("len", this.gridGroup.length);
		// console.log("rem", this.emitterGroup.getChildAt(0).x)
		// TODO: adjust emitters to fit grid gaps
		console.log(this.emitterGroup.width, window.innerWidth);
		for (let emitter in this.emitterGroup.children) {
			console.log("emit", emitter);
		}
		this.emitterGroup.visible = true;
		var grid: Phaser.Sprite;
		for (let g = 0; g < this.gridGroup.length; g++) {
			grid = this.gridGroup.getChildAt(g) as Phaser.Sprite;
			console.log('grid', grid.inCamera);
			// if (grid.inCamera === true) {
			// 	console.log("x", grid.x, this.game.camera.x);
			// 	console.log('pre', this.emitterGroup.cameraOffset.x);
			// 	// if (grid.x < this.game.camera.x)
			// 	// 	this.emitterGroup.cameraOffset.x = this.game.camera.x - grid.x;
			// 	// else this.emitterGroup.cameraOffset.x = grid.x - this.game.camera.x;
			// 	// this.emitterGroup.x += Math.abs(grid.x - this.game.camera.x);
			// 	// console.log('post', this.emitterGroup.cameraOffset.x);
			// 	break;
			// }
		}
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
