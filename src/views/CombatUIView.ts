import NavigationState from "../states/NavigationState";

export default class CombatUIView extends Phaser.Group {
	
	abilityUI: Phaser.Group;
	profileUI: Phaser.Group;
	navigationState: NavigationState;

	constructor(game: Phaser.Game, parent: any | null, name: string, addToStage?: boolean | false, enableBody?: boolean | false, physicsBodyType?: any) {
		console.log("== CombatUIView.constructor ==");
	
		super(game, parent, name, addToStage, enableBody, physicsBodyType);

		return this;
	}
	addView() {
		console.log("== CombatUIView.create ==");
		// draw ability slots
		this.addAbilitySlots();
	}
	addProfile() {

	}
	addAbilitySlots() {
		// var scaleRatio = window.devicePixelRatio / 3;

		console.log("* pixel ratio", devicePixelRatio, devicePixelRatio % 1);
		var ratio = devicePixelRatio + (devicePixelRatio % 1);
		var sq = 50;
		var recX = (sq + 10) * ratio;//devicePixelRatio;
		var gap = 10;
		var abilitySlots: Phaser.Graphics;
		for (var i = 0; i < 5; i++) {
			abilitySlots = this.game.add.graphics(50, 0, this);
			abilitySlots.key = "ability_" + i.toString();
			abilitySlots.lineStyle(2, 0xa9a9a9, 1);
			abilitySlots.beginFill(0x000000);
			abilitySlots.drawRect(recX * i, 15, sq * ratio, sq * ratio);
			abilitySlots.inputEnabled = true;
			// abilitySlots.input.priorityID = 0;
			abilitySlots.events.onInputDown.add(this.downListener, this);

			this.abilityUI = this.game.add.group();
			this.add(this.abilityUI);
			this.abilityUI.add(abilitySlots);
		}
	}
	downListener(e:Phaser.Graphics) {
		console.log("down", e.key, this.navigationState.inputEvent(e.key as string));
		// first, find active player
	}
}