import CrewView from "./CrewView";
import { BackgroundView } from "./BackgroundView";

export default class CombatStageView extends Phaser.Group {

	private _crewAttack: CrewView;//Phaser.Group;
	private _crewDefend: CrewView;//Phaser.Group;
	private _bg: BackgroundView;//Phaser.Sprite;
	private _ratio: number;
	worldscale: number;
	items: object[];

	constructor(game: Phaser.Game, parent: any | null, name: string, addToStage?: boolean | false, enableBody?: boolean | false, physicsBodyType?: any) {
		console.log("== CombatStageView.constructor ==");
	
		super(game, parent, name, addToStage, enableBody, physicsBodyType);

		// this.width = 2000;//this.game.world.width;
		return this;
	}

	public get bg(): BackgroundView {
		return this._bg;
	}

	public set bg(value: BackgroundView) {
		console.log("* bg setter", value);

		this._bg = value;
		this._bg.anchor.setTo(0, 1);

		this.add(value);
	}

	public get ratio(): number {
		return this._ratio;
	}

	public set ratio(value: number) {
		console.log("* ratio setter", value);
		this._ratio = value;
		// this._bg.tileScale.set(value * 2, value * 2);
		this._bg.scale.set(value * 2, value * 2);
	}

	public get crewAttack(): CrewView {
		return this._crewAttack;
	}

	public set crewAttack(value: CrewView) {
		this.add(value);
		this._crewAttack = value;
		this._crewAttack.x = 0;

		// add crewAttack to game world (for scrolling)
		this.game.world.add(value);

		// boundary collision
		// value.body.collideWorldBounds = true;
		// console.log("* crew", value.x, value.y, value.width, value.height);

		// camera
		// this.game.renderer.renderSession.roundPixels = true;
		// var cam = this.game.world.camera;
		// cam.setBoundsToWorld();
		// cam.bounds.setTo(0, 0, this.width, this.height);
 		// cam.setSize(value.width, value.height);
		// value.anchor.setTo(0, 0);
		// cam.follow(value, Phaser.Camera.FOLLOW_LOCKON);//this.children[3] as Phaser.Sprite);
		// cam.deadzone = new Phaser.Rectangle(0, 0, 400, 600);
		// console.log("* cam", this.height, this.game.height, cam.bounds);//.height);
		// this.game.debug.cameraInfo(cam, 40, 40);
	}

	public get crewDefend(): CrewView {
		return this._crewDefend;
	}

	public set crewDefend(value: CrewView) {
		this.add(value);
		this._crewDefend = value;
		this._crewDefend.scale.x = -1;
		// this._crewDefend.scale.y = 1;
		this._crewDefend.x = 1200;
		// this._crewDefend.pivot.set(0, 0);//-this.height);
		// add crewDefend to game world (for scrolling?)
		this.game.world.add(value);
		console.log("* CREW *", this.width, value.width);
	}

	addView() {
		console.log("== CombatStageView.addView ==");
		this.width = window.innerWidth;
		console.log("* width", this.width, this.height, window.innerWidth, window.innerHeight);
		this.worldscale = 1;
		// this.pivot.set(0.5 * this.parent.width, 0.5 * this.parent.height);
		this.pivot.set(0, 0);
		this.scale.set(Phaser.Math.clamp(this.worldscale, 1, 1.5));
		this.game.world.setBounds(this.x, this.y, this.width, this.height);
		// this.bg = new Phaser.TileSprite(this.game, 0, 0, this.width, this.game.height * this.ratio * 2, "bg");
		// this.bg.tileScale.set(this.ratio * 2, this.ratio * 2);
		// this.game.world.add(this.crewAttack);
		console.log("== combat view dimens ==");
		console.log("combatStageView", this.width, this.height);
		console.log("stage", this.game.stage.width, this.game.stage.height);
		console.log("game", this.game.width, this.game.height);
		console.log("world", this.game.world.bounds.width, this.game.world.bounds.height);
		console.log("camera", this.game.camera.bounds.width, this.game.camera.bounds.height);
	}
	
	update() {
		super.update();
		// console.log("*", this.crewAttack.position.x);
		// this.bg.tilePosition.x += 2;
		// this.worldscale = 1;
      	// this.pivot.set(0.5 * this.width, 0.5 * this.height);
		  // this.scale.set(Phaser.Math.clamp(this.worldscale, 1, 1.5));
		//   this.game.world.camera.focusOnXY(this.crewAttack.x, this.crewAttack.y);
	}

}