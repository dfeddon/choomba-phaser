export default class LobbyState extends Phaser.State {

	preload() {
		console.log("== LobbyState.preload ==");
	}

	create() {
		console.log("== LobbyState.create ==");
		this.game.state.start("NavigationState", true, false);
		this.doRun();
	}

	dragStart(e: any) {
		console.log("dragstart");
	}

	doRun() {
		console.log("== LobbyState.doRun ==");
		var _this = this;

		// pause render loop
		// this.game.paused = true;//lockRender = true;

		// hide game view
		document.getElementById("gameView").style.display = "none";

		// show lobby UI
		document.getElementById("lobbyState").style.display = "grid";

		// listen for pulse click event (stub)
		document.getElementById("pulseClicker").addEventListener("click", function(e) {
			console.log("* pulse clicked");
			// hide lobby UI
			document.getElementById("lobbyState").style.display = "none";
			// show game canvas
			document.getElementById("gameView").style.display = "grid";
			// un-pause game
			_this.game.paused = false;
			// switch to NavigationState
			_this.game.state.states.NavigationState.doRun();
		});

		// drag and drop
		document.ondragstart = function(e) {
			console.log("ondragstart", e);
			// e.dataTransfer.setDragImage()
		};
		document.ondragover = function(e) {
			// console.log("ondragover", e);
			e.preventDefault();
		};
		document.ondrop = function(e) {
			console.log("ondrop event", e);
		};

		// touch events
		document.ontouchstart = function(e) {
			console.log("ontouchstart", e);
			// e.preventDefault();
	    };
	}
}