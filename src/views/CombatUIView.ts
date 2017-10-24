import NavigationState from "../states/NavigationState";
import { TilemapObjectVO } from "../models/TilemapObjectsVO";
import MinimapPlayerView from "./MinimapPlayerViews";
import { VectorVO } from "../models/VectorsVO";
import { MinimapPlayerVO } from "../models/MinimapPlayersVO";
import CharacterView from "./CharacterViews";

export default class CombatUIView extends Phaser.Group {
	
	abilityUI: Phaser.Group;
	profileUI: Phaser.Group;
	mapUI: Phaser.Group;
	tileMap: Phaser.Tilemap;
	mapLayer1: Phaser.TilemapLayer;
	player: MinimapPlayerView;//Phaser.Sprite;
	mapLayer: Phaser.Group;
	navigationState: NavigationState;
	border: Phaser.Graphics;

	constructor(game: Phaser.Game, parent: any | null, name: string, addToStage?: boolean | false, enableBody?: boolean | false, physicsBodyType?: any) {
		console.log("== CombatUIView.constructor ==");
	
		super(game, parent, name, addToStage, enableBody, physicsBodyType);

		// this.fixedToCamera = true;

		return this;
	}
	addView() {
		console.log("== CombatUIView.create ==");
		// draw ability slots
		this.addAbilitySlots();
		// add minimap
		this.addMinimap();
		// console.log("combat view dimens", this.width, this.game.world.width, this.game.width);
	}
	addProfile() {

	}
	addAbilitySlots() {
		// var scaleRatio = window.devicePixelRatio / 3;

		console.log("* pixel ratio", devicePixelRatio, devicePixelRatio % 1);
		this.abilityUI = this.game.make.group();
		this.add(this.abilityUI);
		var ratio = devicePixelRatio + (devicePixelRatio % 1);
		var sq = 50;
		var recX = (sq + 10) * ratio;//devicePixelRatio;
		var gap = 10;
		var abilitySlots: Phaser.Graphics;
		for (var i = 0; i < 5; i++) {
			abilitySlots = this.game.make.graphics(50, 0);//, this);
			abilitySlots.key = "ability_" + (i + 1).toString();
			abilitySlots.lineStyle(2, 0xa9a9a9, 1);
			abilitySlots.beginFill(0x000000);
			abilitySlots.drawRect(recX * i, 15, sq * ratio, sq * ratio);
			abilitySlots.inputEnabled = true;
			// abilitySlots.input.priorityID = 0;
			abilitySlots.events.onInputDown.add(this.downListener, this);
			// add to group
			this.abilityUI.add(abilitySlots);
		}
	}

	mapInputHandler(e: Phaser.TilemapLayer, point:PointerEvent) {
		// console.log("**", this.mapUI);
		console.log("map input handler", e, point);
		console.log("map clicked at", this.game.input.mousePointer.x, this.game.input.mousePointer.y, point.x, point.y);
		console.log("*", point.x - this.mapUI.position.x, point.y - this.y);
		var mapX = point.x - this.mapUI.position.x;
		var mapY = point.y - this.y;
		console.log("**", mapX, mapY);
		console.log("* map position", this.mapLayer1.map.getTile(Math.floor(mapX / 64), Math.floor(mapY / 64), "layer1", true));
		var obj = this.getMapObjectByPosition(new Phaser.Point(Math.floor(mapX), Math.floor(mapY)));
	}

	getMapObjectByPosition(p: Phaser.Point) {
		console.log("getMapObjectsByPosition", p);
		// convert positions to base points
		p.x = Math.floor(p.x / 64) * 64;
		p.y = Math.floor(p.y / 64) * 64;

		// get objects
		var objs: object = this.tileMap.objects["objects1"];

		// find key based on point
		var obj: TilemapObjectVO = null;
		for (var key in objs) {
			// console.log("key", objs[key].x, objs[key].y);
			if (objs[key].x === p.x && objs[key].y === p.y) {
				console.log("* GOT OBJ", objs[key]);
				obj = objs[key];
				break;
			}
		}
		return obj;
		// console.log("* objects", this.tileMap.objects["objects1"]);
	}
	getMapObjectByName(n: string) {
		console.log("getMapObjectsByName", n);

		// get objects
		var objs: object = this.tileMap.objects["objects1"];

		// find key based on point
		var obj: TilemapObjectVO = null;
		for (var key in objs) {
			// console.log("key", objs[key].x, objs[key].y);
			if (objs[key].name === n) {
				console.log("* GOT OBJ", objs[key]);
				obj = objs[key];
				// update player directions
				if (this.player) {
					this.player.vo.backwardDir = obj.properties.backward;
					this.player.vo.forwardDir = obj.properties.forward;
				}
				break;
			}
		}
		return obj;
		// console.log("* objects", this.tileMap.objects["objects1"]);
	}

	playerMove(dir: number) {
		console.log("* playerMove", dir, this.player.vo.forwardDir, this.player.vo.backwardDir);
		// dir 1 = right, 2 = left
		if (dir === CharacterView.CHARACTER_STATE_WALK_FORWARD) {
			switch(this.player.vo.forwardDir) {
				case MinimapPlayerVO.PLAYER_MOVING_NORTH: this.player.position.y -= 0.2; break;
				case MinimapPlayerVO.PLAYER_MOVING_SOUTH: this.player.position.y += 0.2; break;
				case MinimapPlayerVO.PLAYER_MOVING_EAST: this.player.position.x += 0.2; break;
				case MinimapPlayerVO.PLAYER_MOVING_WEST: this.player.position.x -= 0.2; break;
			}
		}
		else if (dir === CharacterView.CHARACTER_STATE_WALK_BACKWARD) {
			switch(this.player.vo.backwardDir) {
				case MinimapPlayerVO.PLAYER_MOVING_NORTH: this.player.position.y -= 0.2; break;
				case MinimapPlayerVO.PLAYER_MOVING_SOUTH: this.player.position.y += 0.2; break;
				case MinimapPlayerVO.PLAYER_MOVING_EAST: this.player.position.x += 0.2; break;
				case MinimapPlayerVO.PLAYER_MOVING_WEST: this.player.position.x -= 0.2; break;
			}
		}
		// if valid tile...
		if (this.tileMap.getTile(Math.floor(this.player.position.x / 64), Math.floor(this.player.position.y / 64), "layer1", true) && this.tileMap.getTile(Math.floor(this.player.position.x / 64), Math.floor(this.player.position.y / 64), "layer1", true).index >= 0) {
			// log data
			// console.log("* tile!", this.tileMap.getTile(Math.floor(this.player.position.x / 64), Math.floor(this.player.position.y / 64), "layer1", true));
			
			// if matching x/y object layer object				
			if (~~this.player.x % 64 === 0 && ~~this.player.y % 64 === 0) {
				var tileObj: TilemapObjectVO = this.getMapObjectByPosition(new Phaser.Point(this.player.position.x, this.player.position.y));

				this.centerPlayerOnMap(dir);

				if (tileObj) {
					console.log("* got TileObj", tileObj);
					// tileObj.hasPlayer = true;
					console.log("* change direction?", tileObj.properties);
					this.player.vo.forwardDir = tileObj.properties.forward;
					this.player.vo.backwardDir = tileObj.properties.backward;
				}
			}
			// get forward/backward direction value integers ( 0:none, 1:north, 2:south, 3:east, 4:west )
		}	
		// } else if (dir === 2) {
		// 	this.player.position.y -= 0.2;
		// }
	}

	centerPlayerOnMap(dir: number) {
		// this.mapLayer.x = this.border.width / 2 - 32 - this.player.x;
		// this.mapLayer.y = this.border.height / 2 - 32 - this.player.y;

		var offsetX: number = 0;
		var offsetY: number = 0;
		var adjust: number = 16;

		switch(dir) {
			case MinimapPlayerVO.PLAYER_MOVING_NORTH: offsetY = -adjust; break;
			case MinimapPlayerVO.PLAYER_MOVING_SOUTH: offsetY = adjust; break;
			case MinimapPlayerVO.PLAYER_MOVING_EAST: offsetX = -adjust; break;
			case MinimapPlayerVO.PLAYER_MOVING_WEST: offsetX = adjust; break;
		}
		
		this.game.add.tween(this.mapLayer).to({ x: this.border.width / 2 - 32 - this.player.x + offsetX, y: this.border.height / 2 - 32 - this.player.y + offsetY }, 2000, Phaser.Easing.Exponential.Out, true);
	}

	addMinimap() {
		console.log("* minimap");

		this.mapUI = this.game.make.group();
		// this.mapUI.fixedToCamera = false;
		this.mapLayer = this.game.make.group();//this.mapUI);
		// this.mapLayer.fixedToCamera = false;

		this.mapUI.position.x = this.game.width / 2;//this.width / 2;
		this.add(this.mapUI);

		var map: Phaser.Tilemap = this.game.make.tilemap('tilemap1', 64, 64, 15, 15);
		console.log("* tilemap", map);
		console.log("* objects", map.objects['objects1']);
		map.addTilesetImage('tileset-punks', 'tiles1');
		// this.mapUI.add(map);

		var layer = map.createLayer("layer1", map.width * map.tileWidth, map.height * map.tileHeight);//, this.mapUI);
		layer.inputEnabled = true;
		layer.events.onInputDown.add(this.mapInputHandler, this);
		// layer.checkWorldBounds = true;
		// layer.renderSettings.enableScrollDelta = true;
		var layer2 = map.createLayer("player", map.width * map.tileWidth, map.height * map.tileHeight);//, this.mapUI);
		// layer.scale.set(0.5, 0.5);
		// layer2.scale.add(0.5, 0.5);
		console.log("* layer", layer);

		// add to scope
		this.tileMap = map;
		this.mapLayer1 = layer;
		// this.mapLayer.fixedToCamera = true;

		// assign
		this.mapUI.add(this.mapLayer);
		this.mapLayer.add(layer);
		this.mapLayer.add(layer2);
		// scale minimap
		this.mapLayer.scale.setTo(0.75, 0.75);

		// draw border around mapUI
		var lineWidth: number = 2;
		var border = this.game.make.graphics(0, 0);
		border.lineStyle(lineWidth, 0xffffff, 1);
		border.drawRect(this.mapUI.x, this.mapUI.y, window.innerWidth / 2 - lineWidth, this.game.height - this.getBounds(this.parent).y - lineWidth);//this.mapUI.height - 120);
		this.add(border);
		this.border = border;

		// apply mask to minimap image
		var mask: Phaser.Graphics = this.game.make.graphics(0, 0);
		mask.beginFill(0xffffff);
		mask.drawRect(this.mapUI.x, this.mapUI.y, window.innerWidth / 2, this.mapUI.height);
		mask.endFill();
		this.add(mask);
		this.mapLayer.mask = mask;
		// mask.fixedToCamera = true;
		// this.mapLayer.fixedToCamera = true;

		// this.mapUI.setAll('anchor.x', 0.5);
		// this.mapUI.setAll('anchor.y', 0.5);

		// get spawn object
		var spawn: TilemapObjectVO = this.getMapObjectByName("spawn");
		console.log("* spawn", spawn);

		// add player icon TODO: set start x & y values at spawn tile-object
		var minimapPlayerVO: MinimapPlayerVO = new MinimapPlayerVO();
		minimapPlayerVO.vector = new VectorVO(spawn.x, spawn.y);
		minimapPlayerVO.forwardDir = spawn.properties.forward;
		minimapPlayerVO.backwardDir = spawn.properties.backward;
		minimapPlayerVO.key = "player";
		// this.player = this.game.make.sprite(spawn.x, spawn.y, "player", 0);//, this.mapLayer);
		this.player = new MinimapPlayerView(this.game, minimapPlayerVO);
		// this.player.scale.set(0.35, 0.35);
		console.log("* player", this.player); //this.player.width);
		this.player.anchor.add(0, 0);
		layer2.addChild(this.player);

		// center map on player
		console.log(this.mapLayer.width, this.mapLayer.height);
		console.log("* inner", this.player.x, this.mapUI.width);
		// this.mapLayer.x = ((border.width / 2) - 32) - this.player.x;
		// this.mapLayer.y = ((border.height / 2) - 32) + this.player.y;
		this.centerPlayerOnMap(0);
		// this.mapLayer.y = (this.mapUI.height / 2) - this.player.position.y;
		console.log('* mapLayer pos', this.mapLayer.position);

		// fixed?
		// this.fixedToCamera = false;
		// this.mapUI.fixedToCamera = false;
		// this.mapLayer.fixedToCamera = false;
		// layer2.fixedToCamera = false;
		// this.mapLayer.mask.fixedToCamera = false;
		// this.abilityUI.fixedToCamera = false;
		
		// layer.fixedToCamera = true;
		// this.player.fixedToCamera = true;
	}

	downListener(e:Phaser.Graphics) {
		console.log("down", e.key, this.navigationState.inputEvent(e.key as string));
		// this.mapLayer1.position.setTo(100, 100);
		switch (e.key) {
			case "ability_1":
				this.mapLayer.x -= 32; // 64 - [scale 0.5]
				// this.mapLayer.
				break;
			case "ability_2":
				this.mapLayer.x += 32; // 64 - [scale 0.5]
				break;
			case "ability_3":
				this.mapLayer.y -= 32; // 64 - [scale 0.5]
				break;
			case "ability_4":
				this.mapLayer.y += 32; // 64 - [scale 0.5]
				break;
			case "ability_5":
				this.navigationState.walkLeft = true;
	    }
		console.log("*** x", this.mapLayer1.getTileX(1));
		console.log("*** y", this.mapLayer1.getTileY(0));
		// console.log("*** tile", this.tileMap.getTile(x, y, layer))
		// first, find active player
	}
	// update() {
	// 	// console.log("*");
	// }
}