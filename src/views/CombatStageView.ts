export default class CombatStageView extends Phaser.Group {

	attackGroup: Phaser.Group;
	defendGroup: Phaser.Group;
	private _bg: Phaser.TileSprite;
	private _ratio: number;
	worldscale: number;

	constructor(game: Phaser.Game, parent: any | null, name: string, addToStage?: boolean | false, enableBody?: boolean | false, physicsBodyType?: any) {
		console.log("== CombatStageView.constructor ==");
	
		super(game, parent, name, addToStage, enableBody, physicsBodyType);

		return this;
	}

	public get bg(): Phaser.TileSprite {
		return this._bg;
	}

	public set bg(value: Phaser.TileSprite) {
		console.log("* bg setter", value);
		this._bg = value;

		this.add(value);
	}

	public get ratio(): number {
		return this._ratio;
	}

	public set ratio(value: number) {
		console.log("* ratio setter", value);
		this._ratio = value;
		this._bg.tileScale.set(value * 2, value * 2);
	}

	addView() {
		console.log("== CombatStageView.addView ==");
		this.width = window.innerWidth;
		console.log("* width", this.width, window.innerWidth);
		this.worldscale = 1;
		// this.pivot.set(0.5 * this.width, 0.5 * this.height);
		// this.pivot.set(window.innerWidth/2, window.innerHeight/2);
		this.scale.set(Phaser.Math.clamp(this.worldscale, 1, 1.5));
		// camera
		this.game.camera.follow(this.children[3] as Phaser.Sprite);
	}

	// update() {
	// 	super.update();
	// 	// this.worldscale = 1;
    //   	// this.pivot.set(0.5 * this.width, 0.5 * this.height);
    //   	// this.scale.set(Phaser.Math.clamp(this.worldscale, 1, 1.5));
	// }

}