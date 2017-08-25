export default class CharacterView extends Phaser.Sprite {
	constructor(game: Phaser.Game, x: number, y: number) {
	console.log("== CharacterView.constructor");

	super(game, x, y, "catlvl01", 0); //, 'spriteName', 0);

	// anchor, mid x, y bototm (feet)
	this.anchor.setTo(0.5, 1);

	// animations
	// idle
	this.animations.add("idle", Phaser.Animation.generateFrameNames("Idle/skeleton-Idle_", 0, 17, ".png", 1), 10, true, false);
	// walk
	this.animations.add("walk", Phaser.Animation.generateFrameNames("Walk/skeleton-Walk_", 0, 21, ".png", 1), 10, true, false);
	// death
	this.animations.add("death", Phaser.Animation.generateFrameNames("Death/skeleton-Death_", 0, 21, ".png", 1), 10, true, false);
	// death
	this.animations.add("hit", Phaser.Animation.generateFrameNames("GetHit/skeleton-GetHit_", 0, 21, ".png", 1), 10, true, false);
	// walk
	this.animations.add("attack", Phaser.Animation.generateFrameNames("Shoot/skeleton-Shoot_", 0, 21, ".png", 1), 10, true, false);

	this.animations.play("idle", 24, true);
	game.physics.arcade.enable(this);
	game.add.existing(this);

	// this.toBackground();
	}

	update() {
		this.body.velocity.x = 0;

		if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.body.velocity.x = -150;
			this.animations.play("walk");

			if (this.scale.x == 1) {
			this.scale.x = -1;
			}
		} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.body.velocity.x = 150;
			this.animations.play("walk");

			if (this.scale.x == -1) {
			this.scale.x = 1;
			}
		} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
			this.animations.play("attack");
			this.toBackground();
		} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.H)) {
			this.animations.play("hit");
			this.toForeground();
		} else {
			// this.animations.frame = 0;
			this.animations.play("idle");
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