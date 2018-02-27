import { CharacterVO } from "../models/CharactersVO";
import { AtlasVO } from "../models/AtlasVO";
import { AtlasFrameVO } from "../models/AtlasFramesVO";
import { AtlasPrefixTypeVO } from "../models/AtlasPrefixTypesVO";
import NavigationState from "../states/NavigationState";
import * as jsonData from "../public/assets/atlas.json";
import { Globals } from "../services/Globals";

export default class CharacterView extends Phaser.Sprite {

	public static readonly CHARACTER_STATE_IDLE: number = 0;
	public static readonly CHARACTER_STATE_WALK_FORWARD: number = 1;
	public static readonly CHARACTER_STATE_WALK_BACKWARD: number = 2;

	vo: CharacterVO;
	imgScale: number;
	currentState: number;
	atlas: AtlasVO;
	
	constructor(game: Phaser.Game, vo:CharacterVO) {
		console.log("== CharacterView.constructor ==", vo);

		super(game, vo.vector.x, vo.vector.y, vo.key, 0); //, 'spriteName', 0);
		this.vo = vo;
		vo.view = this; // store reference
		this.imgScale = 0.50;
		this.currentState = 0;

		// get atlas data
		if (!this.atlas) {
			this.atlas = new AtlasVO();
			// define animation keys
			console.log("* data", jsonData);
			var json: JSON = (<any>jsonData).characters;
			console.log("* json", json);
			for (var i in json[vo.key]) {
				// console.log(i);
				this.atlas.keys.push(i);
			}
			// define animations
			var data, prefix, frame;
			for (var j in this.atlas.keys) {
				// set data
				data = json[vo.key][this.atlas.keys[j]];
				// instantiate prefix
				prefix = new AtlasPrefixTypeVO(null, this.atlas.keys[j], data.prefix);
				// instatiate frame
				frame = new AtlasFrameVO(
				prefix,
				data.start,
				data.stop,
				data.suffix,
				data.zeroPad
				);
				// add to animation frames
				this.atlas.frames.push(frame);
			}		
		}

		// console.log("* parent", this.parent);

		// anchor, mid x, y bottom (feet)
		this.anchor.setTo(0, 1); // forward-facing (start right), vertical bottom (on feet)
		this.scale.setTo(this.imgScale, this.imgScale); // scale

		// animations
		for (let framevo of this.atlas.frames) {
			// console.log('frame', framevo);
			this.animations.add(framevo.prefix.prefixKey, Phaser.Animation.generateFrameNames(framevo.prefix[framevo.prefix.prefixKey], framevo.start, framevo.stop, framevo.suffix, framevo.zeroPad), 10, true, false);
		}

		// play default (idle) animation
		this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_IDLE, 24, true);
		// game.physics.arcade.enable(this);
		// game.add.existing(this);

		// mouse/touch event handlers
		this.inputEnabled = true;
		this.events.onInputDown.add(this.clickHandler, this);
		this.events.onInputOver.add(this.overHandler, this);
		this.events.onInputOut.add(this.outHandler, this);
	}

	clickHandler() {
		var signal: Phaser.Signal = new Phaser.Signal();
		var state: NavigationState = this.game.state.getCurrentState() as NavigationState;
		signal.addOnce(state.characterClickHandler, this, 1, this.vo);
		signal.dispatch();
	}

	overHandler() {
		this.tint = 0xff00ff;
	}

	outHandler() {
		this.tint = 0xffffff;
	}

	setState(state: number) {
		if (this.currentState === state) return;

		this.currentState = state;

		switch (state) {
			case 0: // idle
				this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_IDLE);
				// this.body.velocity.x = 0;
			break;
			
			case 1: // walk right
				// console.log(this.animations);
				// this.body.velocity.x = 150;
				this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_WALK);
				this.anchor.setTo(0, 1); // keep anchor forward-facing

				if (this.scale.x < 0) {
					this.scale.x = this.imgScale;
				}
			break;

			case 2: // walk left
				// this.body.velocity.x = -150;
				this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_WALK);

				if (this.scale.x > 0) this.scale.x = -this.imgScale;
				this.anchor.setTo(1, 1); // keep anchor forward-facing
			break;
		}
	}

	update() {
		// default is stationary
		this.body.velocity.x = 0;

		// if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			
		// 	this.body.velocity.x = -150;
		// 	this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_WALK);

		// 	if (this.scale.x > 0) this.scale.x = -this.imgScale;//this.scale.x;
		// 	// console.log("*", this.scale.x);
		// 	this.anchor.setTo(1, 1); // keep anchor forward-facing

		// } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		// 	// console.log(this.animations);
		// 	this.body.velocity.x = 150;
		// 	this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_WALK);
		// 	this.anchor.setTo(0, 1); // keep anchor forward-facing

		// 	if (this.scale.x < 0) {
		// 	this.scale.x = this.imgScale;
		// 	}
		// } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
		// 	this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_ATTACK1);
		// 	// this.toBackground();
		// } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.H)) {
		// 	this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_HIT1);
		// 	this.toForeground();
		// } else {
		// 	// this.animations.frame = 0;
		// 	this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_IDLE);
		// }
	}

	toBackground() {
		// create blur effect
		var blurX: any = this.game.add.filter("BlurX");
		var blurY: any = this.game.add.filter("BlurY");
		blurX.blur = 7;
		blurY.blur = 7;
		this.filters = [blurX, blurY];

		// dim alpha
		this.alpha = 1.0;

		// scale
		// var ratio = Globals.getInstance().getCombatScaleRatio();
		// this.scale.set(ratio, ratio);
	}

	toForeground() {
		// remove blur effect
		var blurX: any = this.game.add.filter("BlurX");
		var blurY: any = this.game.add.filter("BlurY");
		blurX.blur = 0;
		blurY.blur = 0;
		this.filters = [blurX, blurY];

		// restore alpha
		this.alpha = 1.0;

		// unscale
		// this.scale.set(0.75, 0.75);
	}
}