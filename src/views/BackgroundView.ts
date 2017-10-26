class BackgroundView extends Phaser.Sprite {
	private _fg: Phaser.TileSprite;
	private _bg1: Phaser.TileSprite;
	totalWidth: number;

	constructor(game: Phaser.Game, ratio: number, x: number = 0, y: number = 0, key: string = '', frame?: number) {

		console.log("== BackgroundView.constructor ==");
		super(game, x, y, key, frame);

		// set dimensions
		this.totalWidth = 12500;
		this.width = 13000;
		this.height = game.height;

		// bg1 tilesprite
		this._bg1 = new Phaser.TileSprite(this.game, 0, 0, 13000 + window.innerWidth, this.game.height * ratio * 2, "bg");
		this.addChild(this._bg1);

		// add additional parallax bgs
		// add foreground

		// add items
		// add bg items
		// this.items.push({x: 500, image: "item_canister"});
		var item0 = this.game.add.sprite(800, 400, "item_canister", 0);
		item0.anchor.setTo(0, 1);
		item0.scale.setTo(0.75, 0.75);
		item0.inputEnabled = true;
		var itm = this.addChild(item0);
		item0.events.onInputDown.add(this.itemTouched, this);

		// itm.bringToTop();
		// console.log("* img", item0);
		// var img = this.add(item0);
		// img.bringToTop();
	}

	itemTouched() {
		console.log("* item touched");
		var emitter = this.game.add.emitter(800, 250, 200);

		emitter.makeParticles("particle_yellow", [0, 1, 2, 3, 4, 5]);

		// emitter.makeParticles("balls", [0, 1, 2, 3, 4, 5]);

		emitter.minParticleSpeed.setTo(-400, -400);
		emitter.maxParticleSpeed.setTo(400, 400);
		emitter.gravity = new Phaser.Point(0, 0);
		emitter.start(false, 4000, 150);
		// emitter.setRotation(0, 0);
		// emitter.setAlpha(0.3, 0.8);
		// emitter.setScale(0.5, 1);
		// emitter.gravity = -200;

		//	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
		//	The 5000 value is the lifespan of each particle before it's killed
		emitter.start(true, 5000, 100);
	}
}

export { BackgroundView }