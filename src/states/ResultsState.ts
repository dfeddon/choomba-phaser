export default class ResultsState extends Phaser.State {
	
	constructor() {
		super();

		// exitHandler;
	}
  preload() {
    console.log("== ResultsState.preload() ==");

	this.load.image("button", "images/button_blue_1.png");//, 193, 71);
    // this.load.image('preloadBar', 'assets/loader.png');
  }

	create() {
		console.log("== ResultsState.create() ==");
		//  Unless you specifically need to support multitouch I would recommend setting this to 1
		this.input.maxPointers = 1;

		//  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
		// this.stage.disableVisibilityChange = true;

		if (this.game.device.desktop) {
		console.log("* desktop");
		//  If you have any desktop specific settings, they can go in here
		// this.stage.scale.pageAlignHorizontally = true;
		} else {
		console.log("* mobile");
		//  Same goes for mobile settings.
		}

		var text = "Run Results:";
		var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
		var t = this.game.add.text(this.game.world.centerX - 300, 0, text, style);
		// this.game.state.start("PreloaderState", true, false);
		var button = this.game.add.button(this.game.world.centerX - 95, 200, "button", this.exitHandler);//, onUp, this, 2, 1, 0);
		button.scale.setTo(0.25, 0.25);
	}

	exitHandler() {
		console.log("exitHandler");
		// pause game
		this.game.paused = true;
		// hide game view
		document.getElementById("gameView").style.display = "none";
		// back to lobby
		this.game.state.states.LobbyState.doRun();//("LobbyState").doRun();//, true, false);
		// console.log(this.game.states.states);
		// document.getElementById("gameView").style.display = "none";

	    // show lobby UI
    	// document.getElementById("lobbyState").style.display = "grid";
	}

}
