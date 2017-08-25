export default class PreloaderState extends Phaser.State {
 
	preload() {
			  console.log("== PreloaderState.preload ==");
			  
			  this.game.load.crossOrigin = true;
              // this.load.image('preloadBar', 'assets/loader.png');
              this.game.load.atlasJSONHash("char01", "../images/spritesheets/char01.png", "../images/spritesheets/char01.json");
              this.game.load.atlasJSONHash("cutechar01", "../images/spritesheets/cutechar01.png", "../images/spritesheets/cutechar01.json");
              this.game.load.atlasJSONHash("zombie01", "../images/spritesheets/zombie01.png", "../images/spritesheets/zombie01.json");
              this.game.load.atlasJSONHash("catlvl01", "../images/spritesheets/catlvl01.png", "../images/spritesheets/catlvl01.json");
	
			  // load filters
              this.game.load.script("filter_blurX", "https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/BlurX.js");
              this.game.load.script("filter_blurY", "https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/BlurY.js");
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