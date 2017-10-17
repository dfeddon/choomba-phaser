import NavigationState from "../states/NavigationState";

export default class CombatUIView extends Phaser.Group {
	
	abilityUI: Phaser.Group;
	profileUI: Phaser.Group;
	mapUI: Phaser.Group;
	mapLayer1: Phaser.TilemapLayer;
	mapLayer: Phaser.Group;
	navigationState: NavigationState;

	constructor(game: Phaser.Game, parent: any | null, name: string, addToStage?: boolean | false, enableBody?: boolean | false, physicsBodyType?: any) {
		console.log("== CombatUIView.constructor ==");
	
		super(game, parent, name, addToStage, enableBody, physicsBodyType);

		return this;
	}
	addView() {
		console.log("== CombatUIView.create ==");
		// draw ability slots
		this.addAbilitySlots();
		// add minimap
		this.addMinimap();
	}
	addProfile() {

	}
	addAbilitySlots() {
		// var scaleRatio = window.devicePixelRatio / 3;

		console.log("* pixel ratio", devicePixelRatio, devicePixelRatio % 1);
		this.abilityUI = this.game.add.group();
		this.add(this.abilityUI);
		var ratio = devicePixelRatio + (devicePixelRatio % 1);
		var sq = 50;
		var recX = (sq + 10) * ratio;//devicePixelRatio;
		var gap = 10;
		var abilitySlots: Phaser.Graphics;
		for (var i = 0; i < 5; i++) {
			abilitySlots = this.game.add.graphics(50, 0, this);
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

	addMinimap() {
		console.log("* minimap");


		this.mapUI = this.game.add.group();
		this.mapLayer = this.game.add.group();

		this.mapUI.position.x = this.game.width / 2;//this.width / 2;
		this.add(this.mapUI);

		var map: Phaser.Tilemap = this.game.add.tilemap('tilemap1');
		console.log("* tilemap", map);
		map.addTilesetImage('set1', 'tiles1');
		// this.mapUI.add(map);

		var layer = map.createLayer("layer1", map.width * map.tileWidth, map.height * map.tileHeight, this.mapUI);//this.width / 2, this.height, this.mapUI);
		layer.scale.set(0.5, 0.5);
		// layer.position.x = 500;//this.width / 2;
		console.log("* layer", layer);
		layer.resizeWorld();
		// layer.fixedToCamera = true;
		this.mapLayer1 = layer;
		this.mapUI.add(this.mapLayer);
		this.mapLayer.add(this.mapLayer1);

		// draw border around mapUI
		// console.log("* border", layer.world.y, this.getBounds(this.parent));//this, this.game.world.height, this.worldPosition.y);//this.y, this.mapUI.y, this.height, this.mapUI.height, this.abilityUI.height);
		var border = this.game.add.graphics(0, 0);
		border.lineStyle(2, 0xffffff, 1);
		border.drawRect(this.mapUI.x, this.mapUI.y, this.mapUI.width - 2, this.game.height - this.getBounds(this.parent).y - 2);//this.mapUI.height - 120);
		this.add(border);


		// mask
		var mask: Phaser.Graphics = this.game.add.graphics(0, 0);
		mask.beginFill(0xffffff);
		mask.drawRect(this.mapUI.x, this.mapUI.y, this.mapUI.width, this.mapUI.height);
		mask.endFill();
		this.add(mask);
		this.mapLayer.mask = mask;

		// this.mapUI.setAll('anchor.x', 0.5);
		// this.mapUI.setAll('anchor.y', 0.5);
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
    }
		console.log("*** x", this.mapLayer1.getTileX(50))
		console.log("*** y", this.mapLayer1.getTileY(50));
		// first, find active player
	}
}