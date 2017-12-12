export default class PreloaderState extends Phaser.State {
 
	preload() {
			  console.log("== PreloaderState.preload ==");
			  
		this.game.load.crossOrigin = true;
		// this.load.image('preloadBar', 'assets/loader.png');
		//   this.game.load.atlasJSONHash("char01", "../images/spritesheets/char01.png", "../images/spritesheets/char01.json");
		this.game.load.atlasJSONHash("steampunk01", "../images/spritesheets/steampunk01.png", "../images/spritesheets/steampunk01.json");
		this.game.load.atlasJSONHash("steampunk02", "../images/spritesheets/steampunk02.png", "../images/spritesheets/steampunk02.json");
		this.game.load.atlasJSONHash("robot01", "../images/spritesheets/robot01.png", "../images/spritesheets/robot01.json");
		//   this.game.load.atlasJSONHash("zombie01", "../images/spritesheets/zombie01.png", "../images/spritesheets/zombie01.json");
		//   this.game.load.atlasJSONHash("catlvl01", "../images/spritesheets/catlvl01.png", "../images/spritesheets/catlvl01.json");

		// load filters
		this.game.load.script("filter_blurX", "https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/BlurX.js");
		this.game.load.script("filter_blurY", "https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/BlurY.js");

		// load tiles & tilemaps
		this.game.load.tilemap('tilemap1', "../images/tilemaps/maps/tilemap1.json", null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image("tiles1", "../images/tilemaps/tiles/tileset-punks.png");

		// minimap player
		this.game.load.image("player", "../images/player_minimap.png");

		// map items
		this.game.load.image("item_canister", "../images/trashcan.gif");
		this.game.load.image("item_door_1", "../images/bg_item_door1.png");

		// particle
		this.game.load.image("particle_yellow", "../images/glow_yellow.png");

		// abilities
		this.game.load.image("ability_1", "../images/22_1.png");
		this.game.load.image("ability_2", "../images/77_1.png");
		this.game.load.image("ability_3", "../images/55_1.png");
		this.game.load.image("ability_4", "../images/68_1.png");
		this.game.load.image("ability_5", "../images/74_1.png");

		// profiles
		this.game.load.image("profile_1", "../images/portrait_1.png");

		// splash image
		this.game.load.image("splash1", "../images/splash1.jpg");

	}

	create() {
		console.log("== PreloaderState.create ==");
		//  Unless you specifically need to support multitouch I would recommend setting this to 1
		// this.input.maxPointers = 1;

		//  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
		// this.stage.disableVisibilityChange = true;

		// if (this.game.device.desktop) {
			//  If you have any desktop specific settings, they can go in here
			// this.stage.scale.pageAlignHorizontally = true;
		// }
		// else {
			//  Same goes for mobile settings.
		// }

		this.game.state.start('SplashState', true, false);

	}

}