export default class LobbyState extends Phaser.State {

	preload() {
		console.log("== LobbyState.preload ==");
	}

	create() {
		console.log("== LobbyState.create ==");

		// pause render loop
		this.game.paused = true;//lockRender = true;

		// hide game view
		document.getElementById("content").style.display = "none";

		// show lobby UI
		document.getElementById("lobbyState").style.display = "block";
	}
}