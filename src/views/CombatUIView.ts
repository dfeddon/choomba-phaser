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
	activeTileSet: Phaser.Tileset;
	player: MinimapPlayerView;//Phaser.Sprite;
	mapLayer: Phaser.Group;
	navigationState: NavigationState;
	border: Phaser.Graphics;
	isMapCentering: boolean;

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

		var topLine: number = 8;
		
		// profile
		var abilityIcon:Phaser.Sprite = this.game.add.sprite(0, topLine, "profile_1");
		this.add(abilityIcon);
		// name & class
		var textColor: string = "#ccc";
		var characterName: Phaser.Text = this.game.add.text(75, topLine + 15, "Amir Cipher", { font: "15px Arial", fill: textColor });
		var characterClass: Phaser.Text = this.game.add.text(75, topLine + 35, "HACKER", { font: "13px Arial", fill: textColor });
		this.add(characterName);
		this.add(characterClass);

		// abilities
		this.abilityUI = this.game.make.group();
		this.add(this.abilityUI);
		var ratio = devicePixelRatio - (devicePixelRatio % 1);
		var sq = 50;
		var recX = 50 + 5;//(sq + 10) * ratio;//devicePixelRatio;
		var gap = 10;
		var abilitySlots: Phaser.Graphics;
		var abilityIcon: Phaser.Sprite;
		for (var i = 0; i < 5; i++) {
			abilitySlots = this.game.make.graphics(50, 0);//, this);
			abilitySlots.key = "ability_" + (i + 1).toString();
			abilitySlots.lineStyle(2, 0xa9a9a9, 1);
			abilitySlots.beginFill(0x000000);
			console.log("* ratio", ratio, sq);
			abilitySlots.drawRect(recX * i, topLine, 50, 50);//sq * ratio, sq * ratio);
			abilitySlots.inputEnabled = true;
			// abilitySlots.input.priorityID = 0;
			abilitySlots.events.onInputDown.add(this.downListener, this);
			// icon
			abilityIcon = this.game.add.sprite(recX * (i + 1) - 4, topLine + 2, "ability_" + (i + 1).toString());
			abilityIcon.scale.setTo(0.95, 0.95);
			// abilityIcon.scale.setTo
			// add to group
			this.abilityUI.add(abilitySlots);
			this.abilityUI.add(abilityIcon);
			this.abilityUI.x = 150;
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
		if (obj)
			console.log("** tp", obj.x, obj.y, Math.abs(this.player.position.x), Math.abs(this.player.position.y));
	}

	getMapObjectByPosition(p: Phaser.Point) {
		console.log("getMapObjectsByPosition", p);
		// console.log("== mapLayer", this.mapLayer.x, this.mapLayer.y);//, Math.abs(this.mapLayer.x) * -1, Math.abs(this.mapLayer.y) * -1);
		// console.log("== player", this.player.x, this.player.y);
		// align point with map (ignoring "whitespace")
		p.x = p.x + (this.mapLayer.x * -1);
		p.y = p.y + (this.mapLayer.y * -1);
		// console.log('+ phase 1', p.x, p.y);
		// because map is scaled in half, multiple point by its inverse => 2
		p.x = p.x *= 2;
		p.y = p.y *= 2;
		// console.log("+ phase 2", p.x, p.y);
		// convert positions to base points
		p.x = Math.floor(p.x / 64) * 64;
		p.y = Math.floor(p.y / 64) * 64;
		// console.log("+ phase 3", p.x, p.y);

		// get objects
		var objs: object = this.tileMap.objects["objects1"];

		// find key based on point
		var obj: TilemapObjectVO = null;
		for (var key in objs) {
			// console.log("key", objs[key].x, objs[key].y, ' / ', p.x, p.y);
			if (objs[key].x === p.x && objs[key].y === p.y) {
				// console.log("* GOT OBJ", objs[key]);
				return objs[key];
				// obj = objs[key];
				// break;
			}
		}
		// console.log(obj.x, obj.y, this.player.position.x, this.player.position.y);
		// return obj;
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

	directionManager(forward: string, backward: string) {
		console.log("directionManager", forward, backward);

		var returnValue = {};
		var f: string[] = forward.match(forward.length  % 2 ? /^\d|\d{2}/g : /\d{2}/g).map(String);//.reverse()
		var b: string[] = backward.match(backward.length  % 2 ? /^\d|\d{2}/g : /\d{2}/g).map(String);//.reverse()
		// match current direction
		//this.player.vo.dir (1-2)
		//this.player.vo.forwardDir (1-4)
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

			// store tile reference
			var tile: Phaser.Tile = this.tileMap.getTile(Math.floor(this.player.position.x / 64), Math.floor(this.player.position.y / 64));
			
			// if matching x/y object layer object				
			if (~~this.player.x % 64 === 0 && ~~this.player.y % 64 === 0) {
				var tileObj: TilemapObjectVO = this.getMapObjectByPosition(new Phaser.Point(Math.floor(this.player.position.x), Math.floor(this.player.position.y)));

				// re-center map
				this.centerPlayerOnMap(dir);

				// stop crew


				// change "visitable" tile to "visited"
				if (tile.properties.visitedTileId) {
					this.tileMap.replace(tile.index, this.activeTileSet.firstgid + tile.properties.visitedTileId, tile.x, tile.y, 1, 1, "layer1");
				}

				// check for tile *object*
				if (tileObj) {
					console.log("* got TileObj", tileObj);
					// tileObj.hasPlayer = true;
					console.log("* change direction?", tileObj.properties);
					console.log("* coming from", this.player.vo.forwardDir, this.player.vo.dir);
					console.log("* back", this.directionManager(tileObj.properties.forward.toString(), tileObj.properties.backward.toString()));
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

	centeredComplete() {
		console.log("map center compelte");
		this.isMapCentering = false;
	}

	centerPlayerOnMap(dir: number) {
		if (this.isMapCentering) return;
		else this.isMapCentering = true;
		// this.mapLayer.x = this.border.width / 2 - 32 - this.player.x;
		// this.mapLayer.y = this.border.height / 2 - 32 - this.player.y;

		var offsetX: number = 0;//Math.abs(this.mapLayer.x) * -1;
		var offsetY: number = 0;
		var adjust: number = 16;

		// switch(dir) {
		// 	case MinimapPlayerVO.PLAYER_MOVING_NORTH: offsetY = -adjust; break;
		// 	case MinimapPlayerVO.PLAYER_MOVING_SOUTH: offsetY = adjust; break;
		// 	case MinimapPlayerVO.PLAYER_MOVING_EAST: offsetX = -adjust; break;
		// 	case MinimapPlayerVO.PLAYER_MOVING_WEST: offsetX = adjust; break;
		// }
		// if (Math.abs(this.player.position.x) * -1 > 0)
		// 	offsetX = -64;
		// else offsetX = 64;
		// if (Math.abs(this.player.position.y) * -1 > 0)
		// 	offsetY = 64;
		// else offsetY = -64;
		console.log("* mapLayer pre:", this.mapLayer.position.x, this.mapLayer.position.y, this.position.x, this.position.y);
		console.log(Math.abs(this.mapLayer.x) * -1, Math.abs(this.mapLayer.y) * -1);
		var toX = (this.border.width / 2) - 32 - this.player.x;// + offsetX;
		var toY = (this.border.height / 2) - 32 - this.player.y;// * -1);// + offsetY;
		var tween = this.game.add.tween(this.mapLayer).to({ x: toX, y: toY }, 2000, Phaser.Easing.Exponential.Out, true);
		tween.onComplete.addOnce(this.centeredComplete, this);
		console.log("* mapLayer post:", this.border.width / 2 - 32 - this.player.x + offsetX, this.border.height / 2 - 32 - this.player.y + offsetY, this.player.position.x, this.player.position.y);
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
		this.activeTileSet = map.addTilesetImage('tileset-punks', 'tiles1');
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
		this.mapLayer.scale.setTo(0.5, 0.5);

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