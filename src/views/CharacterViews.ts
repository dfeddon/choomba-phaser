import { CharacterVO } from "../models/CharactersVO";
import { AtlasFrameVO } from "../models/AtlasFramesVO";
import { AtlasPrefixTypeVO } from "../models/AtlasPrefixTypesVO";

export default class CharacterView extends Phaser.Sprite {
	vo: CharacterVO;
	imgScale: number;
	
	constructor(game: Phaser.Game, vo:CharacterVO) {
		console.log("== CharacterView.constructor ==", vo);

		super(game, vo.vector.x, vo.vector.y, vo.key, 0); //, 'spriteName', 0);
		this.vo = vo;
		this.imgScale = 0.50;
		console.log("* parent", this.parent);

		// anchor, mid x, y bototm (feet)
		this.anchor.setTo(0, 1); // forward-facing (start right), vertical bottom (on feet)
		this.scale.setTo(this.imgScale, this.imgScale); // scale to 75%

		// animations
		for (let framevo of vo.atlas.frames) {
			// console.log('frame', framevo);
			this.animations.add(framevo.prefix.prefixKey, Phaser.Animation.generateFrameNames(framevo.prefix[framevo.prefix.prefixKey], framevo.start, framevo.stop, framevo.suffix, framevo.zeroPad), 10, true, false);
		}

		// play default (idle) animation
		this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_IDLE, 24, true);
		game.physics.arcade.enable(this);
		game.add.existing(this);
	}

	update() {
		// default is stationary
		this.body.velocity.x = 0;

		if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			
			this.body.velocity.x = -150;
			this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_WALK);

			if (this.scale.x > 0) this.scale.x = -this.imgScale;//this.scale.x;
			// console.log("*", this.scale.x);
			this.anchor.setTo(1, 1); // keep anchor forward-facing

		} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			// console.log(this.animations);
			this.body.velocity.x = 150;
			this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_WALK);
			this.anchor.setTo(0, 1); // keep anchor forward-facing

			if (this.scale.x < 0) {
			this.scale.x = this.imgScale;
			}
		} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
			this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_ATTACK1);
			// this.toBackground();
		} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.H)) {
			this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_HIT1);
			this.toForeground();
		} else {
			// this.animations.frame = 0;
			this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_IDLE);
		}
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
		// this.scale.set(1.25, 1.25);
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
	}
}