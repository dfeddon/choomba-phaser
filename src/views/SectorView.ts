// import { CharacterDataVO } from "../models/CharacterDataVO";
import CharacterView from "./CharacterViews";
import { CharacterVO } from "../models/CharactersVO";
import { VectorVO } from "../models/VectorsVO";
import { BuildingFactoryView } from "../views/BuildingFactoryView";
import * as _ from "lodash";
import { Globals } from "../services/Globals";
import { SectorBlockVO } from "../models/SectorBlockVO";
import { PointHelper } from "../helpers/PointHelper";
import { RandomDataGenerator, Point } from "phaser-ce";

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
	sectorGroup: Phaser.Group;
	gridGroup: Phaser.Group;
	emitterGroup: Phaser.Group;
	uiGroup: Phaser.Group;
	fovGroup: Phaser.Group;
	fov: Phaser.Sprite;
	b1Sprite: Phaser.Sprite;
	// compass: Phaser.Graphics;
	totalBlocksX: number;
	totalBlocksY: number;
	rndBuilding: string[];
	renderTimerActive: boolean;

	blocksKnown: SectorBlockVO[];

	// iso
		//level array
	levelData: any[];

	//x & y values of the direction vector for character movement
	dX: number;
	dY: number;
	tileWidth: number;// the width of a tile
	borderOffset: Phaser.Point;//to centralise the isometric level display
	wallGraphicHeight: number;
	floorGraphicWidth: number;
	floorGraphicHeight: number;
	heroGraphicWidth: number;
	heroGraphicHeight: number;
	wallHeight: number;
	heroHeight: number;//adjustments to make the legs hit the middle of the tile for initial load
	heroWidth: number;//for placing hero at the middle of the tile
	facing: string;//direction the character faces
	sorcerer: any;//hero
	sorcererShadow: any;//duh
	shadowOffset: Phaser.Point;// = new Phaser.Point(this.heroWidth + 7, 11);
	bmpText: Phaser.BitmapText;//title text
	normText: Phaser.Text;//text to display hero coordinates
	minimap: Phaser.Group;//minimap holder group
	heroMapSprite: Phaser.Sprite;//hero marker sprite in the minimap
	gameScene: Phaser.RenderTexture;//this is the render texture onto which we draw depth sorted scene
	// floorSprite: Phaser.Sprite;
	tileSprites:object[];//Phaser.Sprite;
	heroMapTile: Phaser.Point;//hero tile values in array
	heroMapPos: Phaser.Point;//2D coordinates of hero map marker sprite in minimap, assume this is mid point of graphic
	heroSpeed: number;//well, speed of our hero 

	// constructor(game: Phaser.Game, parent?: PIXI.DisplayObjectContainer, name?: string, addToStage?: boolean, enableBody?: boolean, physicsBodyType?: number) {
	constructor(game: Phaser.Game, x: number, y: number, key?: string, totalBlocksX?: number, totalBlocksY?: number) {
		console.log("== SectorView.constructor ==", x, y, key);

		super(game, x, y, key);//game, parent, name, addToStage, enableBody, physicsBodyType);
		this.totalBlocksX = totalBlocksX;
		this.totalBlocksY = totalBlocksY;
		this.tileWidth = 64;//50;// the width of a tile
		this.borderOffset = new Phaser.Point(this.tileWidth * this.totalBlocksX, this.tileWidth);//250, 50);//to centralise the isometric level display
		// this.wallGraphicHeight = this.tileWidth;//72;
		// this.floorGraphicWidth = 128;//103;
		// this.floorGraphicHeight = this.tileWidth;//53;
		// this.heroGraphicWidth = 41;
		// this.heroGraphicHeight = 62;
		// this.wallHeight = this.wallGraphicHeight - this.floorGraphicHeight;
		// this.heroHeight = (this.floorGraphicHeight / 2) + (this.heroGraphicHeight - this.floorGraphicHeight) + 6;//adjustments to make the legs hit the middle of the tile for initial load
		// this.heroWidth = (this.floorGraphicWidth / 2) - (this.heroGraphicWidth / 2);//for placing hero at the middle of the tile
		this.facing = 'south';//direction the character faces
		this.shadowOffset = new Phaser.Point(this.heroWidth + 7, 11);
		this.heroSpeed = 1.2;
		
		let levelArray = [];
		let xArray: object[];
		// console.log("* stage vs world", this.game.stage.width, this.game.world.width);
		let rng: number;
		let tile: object;
		let tileHeight: number = this.tileWidth;
		console.log("* scene w/h", totalBlocksX, totalBlocksY, totalBlocksX * this.tileWidth, totalBlocksY*this.tileWidth);
		for (let i = 0; i < totalBlocksY; i++) {
			for (let j = 0; j < totalBlocksX; j++) {
				if (j === 0)
					xArray = [];
				rng = this.game.rnd.integerInRange(0, 100);
				if (rng < 5) tile = { t: 2, h: tileHeight + 12, k: "bldg1" };
				else if (rng < 10) tile = { t: 3, h: tileHeight + 5, k: "bldg2" };
				else if (rng < 15) tile = { t: 4, h: tileHeight + 8, k: "bldg3" };
				else if (rng < 20) tile = { t: 5, h: tileHeight + 17, k: "bldg4" };
				else if (rng < 25) tile = { t: 6, h: tileHeight + 52, k: "bldg5" };
				else if (rng < 30) tile = { t: 6, h: tileHeight + 30, k: "bldg6" };
				else if (rng < 35) tile = { t: 7, h: tileHeight, k: "floor2" };
				// else if (rng < 48) tile = {t:1,h:this.tileWidth,k:"tent1"};
				else tile = { t: 0, h: this.tileWidth, k: "floor1" };
				xArray.push(tile);
			}
			levelArray.push(xArray);
		}
		console.log("level data", levelArray[0].length, levelArray.length);
		console.log(levelArray);
		// levelArray[0][0] = {t:3,h:this.tileWidth};
		this.levelData = levelArray;
		// this.levelData = [
		// 	[1, 0, 0, 0, 1, 0],
		// 	[0, 0, 0, 0, 0, 0],
		// 	[0, 0, 1, 2, 0, 0],
		// 	[0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 1, 0, 0],
		// 	[0, 1, 0, 0, 0, 0]
		// ];
	}

	created(blocksKnown: SectorBlockVO[]) {
		console.log("== SectorView.created() ==", this, blocksKnown);

		this.blocksKnown = blocksKnown;

		this.renderTimerActive = false;

		// sector group
		this.sectorGroup = this.game.make.group();
		this.sectorGroup.name = "sectorGroup";
		// this.gridGroup.inputEnableChildren = true;
		// this.gridGroup.ignoreChildInput = false;
		// this.gridGroup.onChildInputDown.add(this.clickHandler, this);
		

		// grid group
		this.gridGroup = this.game.make.group();
		this.gridGroup.inputEnableChildren = true;
		this.gridGroup.ignoreChildInput = false;
		// this.gridGroup.onChildInputDown.add(this.clickHandler, this);
		this.gridGroup.name = "gridGroup";

		this.fovGroup = this.game.make.group();
		this.fovGroup.inputEnableChildren = false;
		this.fovGroup.ignoreChildInput = true;
		this.fovGroup.name = "fovGroup";

		this.sectorGroup.add(this.gridGroup);
		this.sectorGroup.add(this.fovGroup);
		// this.sectorGroup.sendToBack(this.fovGroup);

		// emitter group
		/*this.emitterGroup = this.game.add.group();
		// this.emitterGroup.x = this.game.world.position.x;
		this.emitterGroup.fixedToCamera = true;
		this.emitterGroup.cameraOffset.x = 0;//17.5; // <- wtf?
		this.emitterGroup.cameraOffset.y = 0;//-7;
		this.emitterGroup.inputEnableChildren = false;
		this.emitterGroup.ignoreChildInput = true;*/

		// UI group
		this.uiGroup = this.game.make.group();
		this.uiGroup.fixedToCamera = true;
		this.uiGroup.inputEnableChildren = true;
		this.uiGroup.ignoreChildInput = false;
		this.uiGroup.name = "uiGroup";
		// this.uiGroup.onChildInputDown.add(this.clickHandler, this);		

		// console.log("* emitter", this.emitterGroup.world);
		// console.log("derek", this.game.world.position, this.game.stage.position, this.game.canvas.getBoundingClientRect());
		// set camera offset to the diff between screen and camera (this.tileWidth)
		// console.log("* dif", window.innerWidth, this.game.camera.width, this.game.width);
		let dif = Math.ceil(window.innerWidth / this.tileWidth) * this.tileWidth - window.innerWidth;
		console.log("* dif final", dif, this.game.world.position);

		// fov fov
		let fov: Phaser.Graphics = this.game.make.graphics(0, 0);
		// fov.beginFill(0xffffff, 1);
		fov.lineStyle(2, 0x9dd7e7, 1);
		// blockRec.beginFill(0x121f1f, 1);
		fov.drawRect(0, 0, this.tileWidth, this.tileWidth);
		fov.endFill();
		// this.fov = this.game.add.sprite(32, 32, fov.generateTexture());
		// this.fov.anchor.setTo(0.5, 0.5);
		// let fovTexture = fov.generateTexture();
		let fovReticle: Phaser.Sprite = this.game.make.sprite(32, 32, fov.generateTexture());
		fovReticle.rotation = 0.45;
		fovReticle.anchor.setTo(0.5, 0.5);
		this.fov = this.fovGroup.add(this.game.make.sprite(0, 0, "reticle"));
		// this.game.add.sprite(0, 0, this.fov.key);//(0, 0, this.fov.key);
		// this.game.physics.p2.enable(this.fov);
		// this.game.physics.startSystem(Phaser.Physics.ARCADE);
		// this.game.physics.enable(this.fov, Phaser.Physics.ARCADE);
		this.game.camera.follow(this.fov);
		
		// add nav
		/*this.compass = this.game.make.graphics(0, 0);
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
		this.compass.events.onInputDown.add(this.compassClickHandler, this);*/

		// add scale
		let zoom: Phaser.Graphics = this.game.make.graphics(0, 0);
		let zoomSize: number = 50;
		let zoomPadding: number = 50;
		zoom.lineStyle(1, 0x121f1f, 1);
		zoom.beginFill(0x121f1f, 1);
		zoom.drawCircle(0, 0, zoomSize);
		zoom.endFill();
		zoom.x = window.innerWidth - zoomSize;// + zoomPadding;
		zoom.y = window.innerHeight - zoomSize;// - zoomPadding;

		zoom.inputEnabled = true;
		zoom.input.useHandCursor = true;
		zoom.events.onInputDown.add(this.zoomClickHandler, this);

		// add info view
		let infoWin: Phaser.Graphics = this.game.make.graphics(0, 0);
		infoWin.name = "window";
		let infoSize: number = 250;
		let infoPadding: number = 50;
		infoWin.lineStyle(1, 0xffffff, 1);
		infoWin.beginFill(0x121f1f, 1);
		infoWin.drawRect(0, 0, infoSize, infoSize);
		infoWin.endFill();
		infoWin.x = infoPadding;// + zoomPadding;
		infoWin.y = window.innerHeight - infoSize - infoPadding;// - zoomPadding;

		infoWin.inputEnabled = true;
		infoWin.input.useHandCursor = true;
		// text style
		let infoStyle = {
			font: "21px Teko",
			fill: "#ff0044",
			align: "left"
		}
		// address
		let textAddress: Phaser.Text = new Phaser.Text(this.game, infoWin.x + 15, infoWin.y + 15, "Address", infoStyle);
		textAddress.name = "address";
		// structure type
		let textStructure: Phaser.Text = new Phaser.Text(this.game, textAddress.x, textAddress.y + 20, "Structure", infoStyle);
		textStructure.name = "structure";
		// structure owner
		let textOwner: Phaser.Text = new Phaser.Text(this.game, textAddress.x, textStructure.y + 20, "Owner", infoStyle);
		textOwner.name = "owner";

		this.uiGroup.add(zoom);
		this.uiGroup.add(infoWin);
		this.uiGroup.add(textAddress);
		this.uiGroup.add(textStructure);
		this.uiGroup.add(textOwner);
		// this.uiGroup.add(infoWin);
		// info.events.onInputDown.add(this.zoomClickHandler, this);

		// random building pool
		this.rndBuilding = ['foursquare', 'threecirc', 'multi-1', 'multi-tenent', 'hq', 'factory'];
		this.initIsoGrid();
		// let length: number = (window.innerWidth > window.innerHeight) ? window.innerWidth : window.innerHeight;
		/*let total: number = Math.ceil(this.totalBlocksX * this.totalBlocksY);
		console.log("* total", total);
		this.gridGroup.removeAll(true);
		var enabled = this.game.renderer.setTexturePriority(this.rndBuilding);
		console.log("* priority", enabled);
		var rnd: number;
		var sprite: Phaser.Sprite;
		let grids = this.gridGroup.createMultiple(total / this.rndBuilding.length, this.rndBuilding, 0, true);
		grids.forEach(function(grid: Phaser.Sprite) {
			console.log("+ grid", grid.key);
			grid.smoothed = false;
		});
		console.log("* aligning...");
		let padding: number = 10;
		// shuffle
		// grids = _.shuffle(grids);
		this.gridGroup.align(this.totalBlocksX, this.totalBlocksY, this.tileWidth + padding, this.tileWidth + padding);*/
		// empty block
		// let bdgEmpty: Phaser.Sprite = new BuildingFactoryView(this.game, 0, 0).getBuilding(BuildingFactoryView.BUILDING_TYPE_EMPTY);
		// rndBuilding.push(bdgEmpty);
		// create building 1
		// let bdgStandard: Phaser.Sprite = new BuildingFactoryView(this.game, 0, 0).getBuilding(BuildingFactoryView.BUILDING_TYPE_STANDARD);
		// rndBuilding.push(bdgStandard);

		// create car (vert)
		/*let carColor:number = 0x384b4b;
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
		blockCarHor.destroy();*/

		// block style
		// let totalGrids = this.totalBlocksX * this.totalBlocksY; // this.tileWidth x this.tileWidth
		// totalGrids = totalGrids / 4;
		// let r = Math.sqrt(totalGrids) - 1;

		// grid
		// console.log("* max textures on this machine", this.game.renderer.maxTextures);
		// this.game.clearBeforeRender = false; // this negates stage backgroundcolor
		// var sprite: Phaser.Sprite;
		// var image = this.game.cache.checkImageKey('foursquare');
		// console.log("* image in cache", image);
		// let longest: number = (window.innerWidth > window.innerHeight) ? window.innerWidth : window.innerHeight;
		// let total: number = Math.ceil(longest / this.tileWidth);
		// console.log("* total", total);
		// this.gridGroup.removeAll(true);
		// for (let i = 0; i < total; i++) {
		// 	// draw block
		// 	var sprite: Phaser.Sprite = this.gridGroup.create(0, 0, this.rndBuilding[this.game.rnd.integerInRange(0, this.rndBuilding.length - 1)]);
		// 	sprite.smoothed = false;
		// }

		// let padding: number = 10;
		// this.gridGroup.align(total, total, this.tileWidth + padding, this.tileWidth + padding);
		// var enabled = this.game.renderer.setTexturePriority(['foursquare', 'threecirc']);

		// cars
		/*
		let emitter: Phaser.Particles.Arcade.Emitter;
		let exy: number = this.tileWidth + 10; // emitter x/y val
		let speed: number;
		let freq: number;
		let duration: number;
		let cols: number = this.totalBlocksY;
		let rows: number = this.totalBlocksX;

		let longest: number = (window.innerWidth > window.innerHeight) ? window.innerWidth : window.innerHeight;
		let totalCarEmitters: number = Math.ceil(longest / this.tileWidth);
		// console.log("* longest", longest, totalCarEmitters, rows, cols);
		for (var j = 1; j < totalCarEmitters; j++) {
			speed = this.game.rnd.integerInRange(350, 550);
			emitter = this.emitterGroup.add(this.game.add.emitter(j * exy + (j - 3) + j + 0, 0, 1));//300));
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
			
			duration = (this.totalBlocksX * this.tileWidth) / speed * 1000;
			freq = this.game.rnd.integerInRange(2500, 10000);
			emitter.start(false, duration, freq, 0, false);
		}
		for (var j = 1; j < totalCarEmitters; j++) {
			speed = this.game.rnd.integerInRange(350, 550);
			emitter = this.emitterGroup.add(this.game.add.emitter(0, j * exy + (j - 1) + j + 0, 1));//300));
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

			duration = (this.totalBlocksX * this.tileWidth) / speed * 1000;
			freq = this.game.rnd.integerInRange(2500, 10000);
			emitter.start(false, duration, freq, 0, false); // TODO: replace 800 with accurate width / speed * 1000
		}*/
		// this.gridGroup.onChildInputDown.add(this.clickHandler, this);
		// this.gridGroup.rotation = 0.25;
		// this.drawGrid();
		this.sectorGroup.rotation = 0;//0.45;
		// this.gridGroup.rotation = 0.45;
		// this.fovGroup.rotation = 0.45;


		// adjust emitter group x/y
		// console.log("===================", this.x, this.gridGroup.x, this.emitterGroup.x, this.game.camera);

		// add UI over grid items
		// this.uiGroup.add(this.compass);
		// this.uiGroup.add(zoom);
		// this.uiGroup.add(infoWin);
		// console.log("* sprite w/h", this.gridGroup.width, this.gridGroup.height);

	}

	initIsoGrid() {
		// let known: SectorBlockVO[] = Globals.getInstance().player.entity.blocksKnown;
		console.log('* known', this.blocksKnown);
		console.log("* total known", this.blocksKnown.length);
		this.createIsoGrid();

	}

	createIsoGrid() {
		// this.bmpText = this.game.add.bitmapText(10, 10, 'font', 'Isometric Tutorial\nUse Arrow Keys', 18);
		// this.normText = this.game.add.text(10, 360, "hi");
		let upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
		let downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		let leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		let rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		// this.game.stage.backgroundColor = '#4488AA';
		//we draw the depth sorted scene into this render texture
		this.gameScene = this.game.add.renderTexture(this.levelData[0].length * (this.tileWidth * 2) + this.tileWidth, this.levelData.length * (this.tileWidth * 2) + this.tileWidth, "gameScene", true);//this.game.width, this.game.height);
		// this.game.stage.width = this.gameScene.width;
		// this.game.stage.height = this.gameScene.height;
		let sp: Phaser.Sprite = this.game.add.sprite(0, 0, this.gameScene);
		this.gridGroup.add(sp);
		// this.floorSprite = this.game.make.sprite(0, 0, 'floor');
		// this.wallSprite = this.game.make.sprite(0, 0, 'wall');
		let spriteKeys: string[] = ["floor1", "floor2", "tent1", "bldg1", "bldg2", "bldg3", "bldg4", "bldg5", "bldg6"];
		this.game.renderer.setTexturePriority(spriteKeys);
		this.tileSprites = [];
		for (let key of spriteKeys)
			this.tileSprites.push({ key: key, sprite: this.game.make.sprite(0, 0, key) });
		
		// this.sorcererShadow = this.game.make.sprite(0, 0, 'heroShadow');
		// this.sorcererShadow.scale = new Phaser.Point(0.5, 0.6);
		// this.sorcererShadow.alpha = 0.4;
		this.createIsoLevel();
	}
	createIsoLevel() {
		this.minimap = this.game.add.group();
		this.uiGroup.add(this.minimap);
		this.minimap.name = "minimap";
		let tileObj: any;
		// var tileType = 0;
		for (var i = 0; i < this.levelData.length; i++) {
			for (var j = 0; j < this.levelData[0].length; j++) {
				tileObj = this.levelData[i][j];
				this.placeTile(tileObj, i, j);
				// if (tileObj.t == 2) {//save hero map tile
				// 	this.heroMapTile = new Phaser.Point(i, j);
				// }
			}
		}
		/* this.addHero();
		this.heroMapSprite = this.minimap.create(this.heroMapTile.y * this.tileWidth, this.heroMapTile.x * this.tileWidth, 'heroTile');
		this.heroMapSprite.x += (this.tileWidth / 2) - (this.heroMapSprite.width / 2);
		this.heroMapSprite.y += (this.tileWidth / 2) - (this.heroMapSprite.height / 2);
		this.heroMapPos = new Phaser.Point(this.heroMapSprite.x + this.heroMapSprite.width / 2, this.heroMapSprite.y + this.heroMapSprite.height / 2);
		this.heroMapTile = PointHelper.getTileCoordinates(this.heroMapPos, this.tileWidth);*/
		this.minimap.scale = new Phaser.Point(0.1, 0.1);
		this.minimap.x = window.innerWidth - this.minimap.width - 50;
		this.minimap.y = window.innerHeight - this.minimap.height - 50;
		this.renderScene();//draw once the initial state
	}

	addHero() {
		// sprite
		/*this.sorcerer = this.game.add.sprite(-50, 0, 'hero', '1.png');// keep him out side screen area

		// animation
		this.sorcerer.animations.add('southeast', ['1.png', '2.png', '3.png', '4.png'], 6, true);
		this.sorcerer.animations.add('south', ['5.png', '6.png', '7.png', '8.png'], 6, true);
		this.sorcerer.animations.add('southwest', ['9.png', '10.png', '11.png', '12.png'], 6, true);
		this.sorcerer.animations.add('west', ['13.png', '14.png', '15.png', '16.png'], 6, true);
		this.sorcerer.animations.add('northwest', ['17.png', '18.png', '19.png', '20.png'], 6, true);
		this.sorcerer.animations.add('north', ['21.png', '22.png', '23.png', '24.png'], 6, true);
		this.sorcerer.animations.add('northeast', ['25.png', '26.png', '27.png', '28.png'], 6, true);
		this.sorcerer.animations.add('east', ['29.png', '30.png', '31.png', '32.png'], 6, true);*/
	}
	placeTile(tileType: any, i: any, j: any) {//place minimap
		var tile = 'greenTile';
		if (tileType.t == 1) {
			tile = 'redTile';
		}
		this.minimap.create(j * this.tileWidth, i * this.tileWidth, tile);
	}
	renderScene() {
		console.log("* renderScene");
		(this.gameScene as any).clear();//clear the previous frame then draw again
		var tileType = 0;
		for (var i = 0; i < this.levelData.length; i++) {
			for (var j = 0; j < this.levelData[0].length; j++) {
				tileType = this.levelData[i][j];
				this.drawTileIso(tileType, i, j);
				// if (i == this.heroMapTile.y && j == this.heroMapTile.x) {
					// this.drawHeroIso();
				// }
			}
		}
		// this.normText.text = 'Hero is on x,y: ' + this.heroMapTile.x + ',' + this.heroMapTile.y;
		this.fov.x = (this.gridGroup.children[0] as Phaser.Sprite).centerX;
		this.fov.y = (this.gridGroup.children[0] as Phaser.Sprite).centerY;
		// console.log("* start x/y", this.fov.x, this.fov.y);
	}
	// drawHeroIso() {
	// 	var isoPt = new Phaser.Point();//It is not advisable to create points in update loop
	// 	var heroCornerPt = new Phaser.Point(this.heroMapPos.x - this.heroMapSprite.width / 2, this.heroMapPos.y - this.heroMapSprite.height / 2);
	// 	isoPt = PointHelper.cartesianToIsometric(heroCornerPt);//find new isometric position for hero from 2D map position
	// 	this.gameScene.renderXY(this.sorcererShadow, isoPt.x + this.borderOffset.x + this.shadowOffset.x, isoPt.y + this.borderOffset.y + this.shadowOffset.y, false);//draw shadow to render texture
	// 	this.gameScene.renderXY(this.sorcerer, isoPt.x + this.borderOffset.x + this.heroWidth, isoPt.y + this.borderOffset.y - this.heroHeight, false);//draw hero to render texture
	// }
	drawTileIso(tileType: any, y: number, x: number) {//place isometric level tiles
		// console.log("* drawTileIso", tileType, x, y);
		var isoPt = new Phaser.Point();//It is not advisable to create point in update loop
		var cartPt = new Phaser.Point();//This is here for better code readability.
		cartPt.x = x * this.tileWidth;
		cartPt.y = y * this.tileWidth;
		isoPt = PointHelper.cartesianToIsometric(cartPt);
		// let sprite: Phaser.Sprite;
		let tileData: any;
		// if (tileType.t == 1) {
		for (let obj of this.tileSprites) {
			if ((obj as any).key === tileType.k) {
				tileData = obj;
				break;
			}
		}

		// if tile not known, dim it
		// tileData.sprite.tint = 0x12051E;
		// tileData.sprite.alpha = 0.25;

		this.gameScene.renderXY(tileData.sprite, isoPt.x + this.borderOffset.x, isoPt.y + this.borderOffset.y - tileType.h, false);
		// } else {
		// 	this.gameScene.renderXY(this.floorSprite, isoPt.x + this.borderOffset.x, isoPt.y + this.borderOffset.y, false);
		// }
	}
	isWalkable() {//It is not advisable to create points in update loop, but for code readability.
		var able = true;
		var heroCornerPt = new Phaser.Point(this.heroMapPos.x - this.heroMapSprite.width / 2, this.heroMapPos.y - this.heroMapSprite.height / 2);
		var cornerTL = new Phaser.Point();
		cornerTL.x = heroCornerPt.x + (this.heroSpeed * this.dX);
		cornerTL.y = heroCornerPt.y + (this.heroSpeed * this.dY);
		// now we have the top left corner point. we need to find all 4 corners based on the map marker graphics width & height
		//ideally we should just provide the hero a volume instead of using the graphics' width & height
		var cornerTR = new Phaser.Point();
		cornerTR.x = cornerTL.x + this.heroMapSprite.width;
		cornerTR.y = cornerTL.y;
		var cornerBR = new Phaser.Point();
		cornerBR.x = cornerTR.x;
		cornerBR.y = cornerTL.y + this.heroMapSprite.height;
		var cornerBL = new Phaser.Point();
		cornerBL.x = cornerTL.x;
		cornerBL.y = cornerBR.y;
		var newTileCorner1;
		var newTileCorner2;
		var newTileCorner3 = this.heroMapPos;
		//let us get which 2 corners to check based on current facing, may be 3
		switch (this.facing) {
			case "north":
				newTileCorner1 = cornerTL;
				newTileCorner2 = cornerTR;
				break;
			case "south":
				newTileCorner1 = cornerBL;
				newTileCorner2 = cornerBR;
				break;
			case "east":
				newTileCorner1 = cornerBR;
				newTileCorner2 = cornerTR;
				break;
			case "west":
				newTileCorner1 = cornerTL;
				newTileCorner2 = cornerBL;
				break;
			case "northeast":
				newTileCorner1 = cornerTR;
				newTileCorner2 = cornerBR;
				newTileCorner3 = cornerTL;
				break;
			case "southeast":
				newTileCorner1 = cornerTR;
				newTileCorner2 = cornerBR;
				newTileCorner3 = cornerBL;
				break;
			case "northwest":
				newTileCorner1 = cornerTR;
				newTileCorner2 = cornerBL;
				newTileCorner3 = cornerTL;
				break;
			case "southwest":
				newTileCorner1 = cornerTL;
				newTileCorner2 = cornerBR;
				newTileCorner3 = cornerBL;
				break;
		}
		//check if those corners fall inside a wall after moving
		newTileCorner1 = PointHelper.getTileCoordinates(newTileCorner1, this.tileWidth);
		if (this.levelData[newTileCorner1.y][newTileCorner1.x] == 1) {
			able = false;
		}
		newTileCorner2 = PointHelper.getTileCoordinates(newTileCorner2, this.tileWidth);
		if (this.levelData[newTileCorner2.y][newTileCorner2.x] == 1) {
			able = false;
		}
		newTileCorner3 = PointHelper.getTileCoordinates(newTileCorner3, this.tileWidth);
		if (this.levelData[newTileCorner3.y][newTileCorner3.x] == 1) {
			able = false;
		}
		return able;
	}


	drawGrid() {
		console.log(this.game.renderType);
		// let length: number = (window.innerWidth > window.innerHeight) ? window.innerWidth : window.innerHeight;
		let total: number = Math.ceil(this.totalBlocksX * this.totalBlocksY);
		console.log("* total", total);
		this.gridGroup.removeAll(true);
		var enabled = this.game.renderer.setTexturePriority(this.rndBuilding);
		console.log("* priority", enabled);
		var rnd: number;
		var sprite: Phaser.Sprite;
		let grids = this.gridGroup.createMultiple(total / this.rndBuilding.length, this.rndBuilding, 0, true);
		grids.forEach(function (grid: Phaser.Sprite) {
			console.log("+ grid", grid.key);
			grid.smoothed = false;
		});
		console.log("* aligning...");
		let padding: number = 10;
		// shuffle
		// grids = _.shuffle(grids);
		this.gridGroup.align(this.totalBlocksX, this.totalBlocksY, this.tileWidth + padding, this.tileWidth + padding);
		// let longest: number = (window.innerWidth > window.innerHeight) ? window.innerWidth : window.innerHeight;
		// let total: number = Math.ceil(longest / this.tileWidth);
		// console.log("* total", total);
		// this.gridGroup.removeAll(true);
		// for (let i = 0; i < total; i++) {
		// 	// draw block
		// 	var sprite: Phaser.Sprite = this.gridGroup.create(0, 0, this.rndBuilding[this.game.rnd.integerInRange(0, this.rndBuilding.length - 1)]);
		// 	sprite.smoothed = false;
		// }

		// let padding: number = 10;
		// this.gridGroup.align(total, total, this.tileWidth + padding, this.tileWidth + padding);
		// var enabled = this.game.renderer.setTexturePriority(['foursquare', 'threecirc']);
	}

	/*compassClickHandler(e: any, p: Phaser.Point) {
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
		t.onComplete.add(this.fovCompleteHandler, this);
	}*/

	fovCompleteHandler(a: any, b: any) {
		// console.log("**", a, b);
		// this.compass.inputEnabled = true;
	}

	zoomClickHandler(e: Phaser.Graphics, p: Phaser.Point) {
		console.log("* sector (view) click handler", e, p);
		// let scaleTo: number = 1;
		if (this.gridGroup.scale.x === 1)
			this.gridGroup.scale.set(2, 2);
		else this.gridGroup.scale.set(1, 1);
		/*
		let zoomAmount = 1;
		this.game.camera.scale.x += zoomAmount;
		this.game.camera.scale.y += zoomAmount;
		*/
		// this.game.camera.width = window.innerWidth;
		// this.game.camera.bounds.x = 0;//window.innerWidth.x * this.game.camera.scale.x;
		// this.game.camera.bounds.y = 0;//window.innerHeight.y * this.game.camera.scale.y;
		// this.game.camera.bounds.width = (this.totalBlocksX * this.tileWidth) * this.gridGroup.scale.x + ((this.totalBlocksX * this.tileWidth) / 4);
		// this.game.camera.bounds.height = (this.totalBlocksY * this.tileWidth) * this.gridGroup.scale.y + ((this.totalBlocksY * this.tileWidth) / 4);
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
		var x = px + (Math.cos(radians) * (px + this.tileWidth));
		var y = py + (Math.sin(radians) * this.tileWidth);
		console.log("* is", x, y, ': diff', px - x, py - y);		
		return { x: x, y: y};
	}

	getGroupChildByName(g: Phaser.Group, n: string, callback: any) {
		g.forEach(function(item: any) {
			console.log(item.name);
			if (n === item.name)
				return callback(item);
		});
	}

	streetToText(s: number): string {
		s = Math.floor(s);
		var x: number = parseInt(s.toString().split('').pop());
		if (s >= 10 && s < 20)
			return "th";
		// console.log("* x", x);
		switch (x) {
			case 0: return 'th';
			case 1: return "st";
			case 2: return "nd";
			case 3: return "rd";
			case 4: return 'th';
			case 5: return 'th';
			case 6: return 'th';
			case 7: return 'th';
			case 8: return 'th';
			case 9: return 'th';
		}
	}

	keyToString(k: string) : string {
		switch(k) {
			case "floor1": return "Streets";
			case "floor2": return "Dirt";
			case "tent1": return "Tents";
			case "bldg1": return "Orange";
			case "bldg2": return "Warehouse";
			case "bldg3": return "Stacked";
			case "bldg4": return "Oil";
			case "bldg5": return "Power";
			case "bldg6": return "Dark";
			case "hq": return "Headquarters";
			case "foursquare": return "Warehouse";
			case "threecirc": return "Silo";
			case "multi-1": return "Drug Den";
			case "multi-tenent": return "Slums";
			case "factory": return "Factory";
		}
	}

	// clickHandler(e: Phaser.Sprite, p: Phaser.Point) {
	// 	console.log("* sector click handler", e, p);
	// 	// console.log("* e", e.x, e.y);
	// 	// console.log("* p", p.x - this.borderOffset.x, p.y);
	// 	// let tile: Phaser.Point = PointHelper.getTileCoordinates(new Phaser.Point(p.x-this.borderOffset.x, p.y), 64);
	// 	// console.log("* tile", tile.x, tile.y);
	// 	// let padj: Phaser.Point = new Point(p.x)
	// 	// let itc: Phaser.Point = PointHelper.isometricToCartesian(p);
	// 	// console.log("iso to cart", itc.x, itc.y, this.borderOffset.x, this.borderOffset.y);
	// 	// console.log("****", p.y + (p.x / 2), p.y - (p.x / 2))  // (-(1 / 2) * screen_x) + (1 * screen_y) + (0 * 1)
	// 	console.log("===================");
	// 	// let cart: Phaser.Point = PointHelper.isometricToCartesian(new Phaser.Point((p.x - this.borderOffset.x) - 64, p.y));
	// 	let cart: Phaser.Point = PointHelper.iso2cart(p, this.borderOffset, this.tileWidth);
	// 	console.log("==", cart.x, cart.y, this.borderOffset.x, this.borderOffset.y);
	// 	let grid: Phaser.Point = PointHelper.getTileCoordinates(cart, 64);
	// 	console.log("==", grid);
	// 	console.log("== tile", this.levelData[grid.y][grid.x]);
	// 	let iso: Phaser.Point = PointHelper.cart2iso(grid, this.borderOffset);
	// 	console.log("++", iso);
	// 	console.log("===================");
	// 	let pt: Phaser.Point = PointHelper.cartesianToIsometric(p);//, this.gameScene, this.game.camera);
	// 	let ptr: Point = new Point(0,0);
	// 	ptr.x = (p.x / 32 + p.y / 32) / 2;
	// 	ptr.y = (p.y / 32 - (p.x / 64)) / 2;
	// 	// console.log("local", this.gridGroup.toLocal(pt, this.gridGroup));
	// 	//
	// 	this.lockTheRenderer(false);
	// 	let addressString = (grid.x + 1).toString() + this.streetToText(grid.x + 1) + " street & " + (grid.y + 1).toString() + this.streetToText(grid.y + 1) + " avenue";
	// 	this.getGroupChildByName(this.uiGroup, "address", function(item: any) {
	// 		item.setText(addressString);
	// 	});
	// 	let strucTypeString: string = this.keyToString(this.levelData[grid.y][grid.x].k as string);
	// 	this.getGroupChildByName(this.uiGroup, "structure", function (item: any) {
	// 		console.log("structType", item, strucTypeString);
	// 		item.setText(strucTypeString);
	// 	});
	// 	let ownerString: string = "[Unclaimed Territory]";
	// 	this.getGroupChildByName(this.uiGroup, "owner", function (item: any) {
	// 		item.setText(ownerString);
	// 	});

	// 	this.fov.alpha = 0;
	// 	// this.emitterGroup.visible = false;
	// 	// let offsetX: number = 0;//this.tileWidth / 2;
	// 	// let offsetY: number = 0;//this.tileWidth / 2;
	// 	// console.log("* rot", this.gridGroup.rotation);
	// 	// var coord: any = this.pointFromAngle(e.centerX, e.centerY);
	// 	// offsetY = Math.cos(this.gridGroup.rotation) * e.position.y;
	// 	// e.loadTexture(this.b1Sprite.key);
	// 	// this.game.camera.focusOnXY(p.x, p.y);
	// 	// this.game.camera.lerp = new Phaser.Point(0.1, 0.1);
	// 	// this.game.camera.view.centerOn(e.position.x, e.position.y);
	// 	// ptr.x = 0; ptr.y = 0;
	// 	// ptr.x += this.borderOffset.x;
	// 	// ptr.y += this.borderOffset.y;
	// 	// console.log("* rot", offsetY);//e.position.x * this.gridGroup.rotation, e.position.y * this.gridGroup.rotation);
	// 	this.game.add.tween(this.fov).to({ x: iso.x, y: iso.y }, 500, Phaser.Easing.Quadratic.InOut, true);
	// 	let t: Phaser.Tween = this.game.add.tween(this.fov).to({ alpha: 1 }, 650, "Linear", true);
	// 	t.onComplete.add(this.mapMoveCompleteHandler, this)
	// }

	// mapMoveCompleteHandler(e: Phaser.Sprite, p: Phaser.Point) {
	// 	console.log("* mapMoveComplete", e, p);
	// 	// console.log("len", this.gridGroup.length);
	// 	// console.log("rem", this.emitterGroup.getChildAt(0).x)
	// 	// TODO: adjust emitters to fit grid gaps
	// 	// console.log(this.emitterGroup.width, window.innerWidth);
	// 	// for (let emitter in this.emitterGroup.children) {
	// 	// 	console.log("emit", emitter);
	// 	// }
	// 	// this.emitterGroup.visible = true;
	// 	// this.drawGrid();
	// 	// return;
	// 	var grid: Phaser.Sprite;
	// 	for (let g = 0; g < this.gridGroup.length; g++) {
	// 		grid = this.gridGroup.getChildAt(g) as Phaser.Sprite;
	// 		// console.log('inCamera', grid.inCamera);
	// 		grid.renderable = grid.inCamera;
	// 		// if (grid.inCamera === true) {
	// 		// 	console.log("x", grid.x, this.game.camera.x);
	// 		// 	console.log('pre', this.emitterGroup.cameraOffset.x);
	// 		// 	// if (grid.x < this.game.camera.x)
	// 		// 	// 	this.emitterGroup.cameraOffset.x = this.game.camera.x - grid.x;
	// 		// 	// else this.emitterGroup.cameraOffset.x = grid.x - this.game.camera.x;
	// 		// 	// this.emitterGroup.x += Math.abs(grid.x - this.game.camera.x);
	// 		// 	// console.log('post', this.emitterGroup.cameraOffset.x);
	// 		// 	break;
	// 		// }
	// 	}
	// 	this.lockTheRenderer(false);
	// 	if (this.renderTimerActive === false) {
	// 		this.game.time.events.add(Phaser.Timer.SECOND * 2, this.lockTheRenderer, this);
	// 		this.renderTimerActive = true;
	// 	}
	// }

	// lockTheRenderer(bool?: boolean) {
	// 	// console.log("* lockTheRenderer", bool);
	// 	// stub (forcing lockRender OFF)
	// 	bool = false;
	// 	if (bool === undefined) bool = true;
	// 	console.log("* render lock", bool);
	// 	this.game.lockRender = bool;
	// 	this.renderTimerActive = false;
	// }

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
