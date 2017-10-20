import NavigationState from "../states/NavigationState";

export default class CombatUIView extends Phaser.Group {
	
	abilityUI: Phaser.Group;
	profileUI: Phaser.Group;
	mapUI: Phaser.Group;
	tileMap: Phaser.Tilemap;
	mapLayer1: Phaser.TilemapLayer;
	player: Phaser.Sprite;
	mapLayer: Phaser.Group;
	navigationState: NavigationState;

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
		var objs = this.tileMap.objects["objects1"];

		// find key based on point
		var obj: Object = null;
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

	addMinimap() {
		console.log("* minimap");

		this.mapUI = this.game.make.group();
		// this.mapUI.fixedToCamera = false;
		this.mapLayer = this.game.make.group(this.mapUI);
		// this.mapLayer.fixedToCamera = false;

		this.mapUI.position.x = this.game.width / 2;//this.width / 2;
		this.add(this.mapUI);

		var map: Phaser.Tilemap = this.game.make.tilemap('tilemap1', 64, 64, 15, 15);
		console.log("* tilemap", map);
		console.log("* objects", map.objects['objects1']);
		map.addTilesetImage('tileset-punks', 'tiles1');
		// this.mapUI.add(map);

		var layer = map.createLayer("layer1", map.width * map.tileWidth, map.height * map.tileHeight, this.mapUI);
		layer.fixedToCamera = true;
		layer.inputEnabled = true;
		layer.events.onInputDown.add(this.mapInputHandler, this);
		// this.game.input.mou
		// layer.renderSettings.enableScrollDelta = true;
		var layer2 = map.createLayer("player", map.width * map.tileWidth, map.height * map.tileHeight, this.mapUI);
		// layer.scale.set(0.5, 0.5);
		// layer2.scale.add(0.5, 0.5);
		console.log("* layer", layer);

		// add to scope
		this.tileMap = map;
		this.mapLayer1 = layer;
		// this.mapLayer.fixedToCamera = true;

		// assign
		this.mapUI.add(this.mapLayer);
		this.mapLayer.add(this.mapLayer1);
		this.mapLayer.add(layer2);

		// draw border around mapUI
		var border = this.game.make.graphics(0, 0);
		border.lineStyle(2, 0xffffff, 1);
		border.drawRect(this.mapUI.x, this.mapUI.y, this.mapUI.width - 2, this.game.height - this.getBounds(this.parent).y - 2);//this.mapUI.height - 120);
		this.add(border);

		// apply mask to minimap image
		var mask: Phaser.Graphics = this.game.make.graphics(0, 0);
		mask.beginFill(0xffffff);
		mask.drawRect(this.mapUI.x, this.mapUI.y, this.mapUI.width, this.mapUI.height);
		mask.endFill();
		this.add(mask);
		this.mapLayer.mask = mask;
		// mask.fixedToCamera = false;

		// this.mapUI.setAll('anchor.x', 0.5);
		// this.mapUI.setAll('anchor.y', 0.5);

		// add player icon TODO: set start x & y values at spawn tile-object
		this.player = this.game.make.sprite(0, 0, "player", 0);//, this.mapLayer);
		// this.player.scale.set(0.35, 0.35);
		console.log("* player", this.player.width);
		this.player.anchor.add(0, 0);
		layer2.addChild(this.player);
	}

	downListener(e:Phaser.Graphics) {
		console.log("down", e.key, this.navigationState.inputEvent(e.key as string));
		// this.mapLayer1.position.setTo(100, 100);
		switch (e.key) {
			case "ability_1":
				this.mapLayer.x -= 32; // 64 - [scale 0.5]
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