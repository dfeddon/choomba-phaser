export default class BootState extends Phaser.State {

	//  Load the Google WebFont Loader script
	// WebFontConfig = {
	// 	//  'active' means all requested fonts have finished loading
	// 	//  We set a 1 second delay before calling 'createText'.
	// 	//  For some reason if we don't the browser cannot render the text the first time it's created.
	// 	// active: function() { this.game.time.events.add(Phaser.Timer.SECOND, createText, this); },

	// 	//  The Google Fonts we want to load (specify as many as you like in the array)
	// 	google: {
	// 		families: ['Fontdiner Swanky']
	// 	}
	// }

	preload() {
		console.log("== BootState.preload() ==");

		// this.load.image('preloadBar', 'assets/loader.png');
		// https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js
    	// this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
	}

	create() {
		console.log("== BootState.create() ==");
		//  Unless you specifically need to support multitouch I would recommend setting this to 1
		this.input.maxPointers = 1;

		//  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
		this.stage.disableVisibilityChange = true;

		if (this.game.device.desktop) {
			console.log("* desktop");
			//  If you have any desktop specific settings, they can go in here
			// this.stage.scale.pageAlignHorizontally = true;
		}
		else {
			console.log("* mobile");
			//  Same goes for mobile settings.
		}

		this.game.state.start('PreloaderState', true, false);

	}

}
