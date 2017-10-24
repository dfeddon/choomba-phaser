class BackgroundView extends Phaser.Sprite {
	private _fg: Phaser.TileSprite;
	private _bg1: Phaser.TileSprite;
	totalWidth: number;

	constructor(game: Phaser.Game, ratio: number, x: number = 0, y: number = 0, key: string = '', frame?: number) {

		console.log("== BackgroundView.constructor ==");
		super(game, x, y, key, frame);
		this.totalWidth = 12500;
		this.width = 13000;
		this.height = game.height;
		this._bg1 = new Phaser.TileSprite(this.game, 0, 0, 13000 + window.innerWidth, this.game.height * ratio * 2, "bg");
		this.addChild(this._bg1);
	}
}

export { BackgroundView }