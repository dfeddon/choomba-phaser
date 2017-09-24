import { CharacterVO } from "../models/CharactersVO";
import { AtlasFrameVO } from "../models/AtlasFramesVO";
import { AtlasPrefixTypeVO } from "../models/AtlasPrefixTypesVO";

export default class CharacterView extends Phaser.Sprite {
	
	constructor(game: Phaser.Game, vo:CharacterVO) {
	console.log("== CharacterView.constructor ==", vo);

	super(game, vo.vector.x, vo.vector.y, vo.key, 0); //, 'spriteName', 0);

	// anchor, mid x, y bototm (feet)
	this.anchor.setTo(0.5, 1);

	// animations
	for (let framevo of vo.atlas.frames) {
		// console.log('frame', framevo);
		this.animations.add(framevo.prefix.prefixKey, Phaser.Animation.generateFrameNames(framevo.prefix[framevo.prefix.prefixKey], framevo.start, framevo.stop, framevo.suffix, framevo.zeroPad), 10, true, false);
	}

	// play default (idle) animation
	this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_IDLE, 24, true);
	game.physics.arcade.enable(this);
	game.add.existing(this);

	// this.toBackground();
	}

	update() {
		this.body.velocity.x = 0;

		if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.body.velocity.x = -150;
			this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_WALK);

			if (this.scale.x == 1) {
			this.scale.x = -1;
			}
		} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			console.log(this.animations);
			this.body.velocity.x = 150;
			this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_WALK);

			if (this.scale.x == -1) {
			this.scale.x = 1;
			}
		} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
			this.animations.play(AtlasPrefixTypeVO.PREFIX_TYPE_ATTACK1);
			this.toBackground();
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
		blurX.blur = 10;
		blurY.blur = 10;
		this.filters = [blurX, blurY];

		// dim alpha
		this.alpha = 0.35;
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