export default class BootState extends Phaser.State {

	preload() {
		console.log("== BootState.preload() ==");

		// this.load.image('preloadBar', 'assets/loader.png');

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
