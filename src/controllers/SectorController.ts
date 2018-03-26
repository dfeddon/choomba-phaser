import { SectorView } from "../views/SectorView";
import { SectorBlockVO } from "../models/SectorBlockVO";
import { SectorBlockService } from "../services/SectorBlockService";
import { Globals } from "../services/Globals";

class SectorController {
	
	game: Phaser.Game;
	state: Phaser.State;
	sectorView: SectorView;
	blocksKnown: SectorBlockVO[] = [];

	constructor(game: Phaser.Game, state: Phaser.State) {
		console.log("== SectorController.constructor ==");
		this.game = game;
		this.state = state;
	}

	init() {
		// first, check cache
		// else, load blocks known
		let array: object[] = [];
		for (let blocks of Globals.getInstance().player.entity.blocksKnown)
			array.push({ id: blocks });
		console.log(Globals.getInstance().player.entity.blocksKnown);
		// console.log('* array', array);
		new SectorBlockService().batchGet(array, {}, (err: any, result: any) => {
			if (err) return console.log(err);
			else {
				// console.log("raw result", result);
				for (let block of result) {
					// console.log("* block", block);
					this.blocksKnown.push(new SectorBlockVO().fromDatabase(block) as SectorBlockVO);
				}
				console.log('* blocksKnown final', this.blocksKnown);
			}
			// start view
			this.getView();
		});
	}

	getView() {
		let totalBlocksX: number = 13;
		let totalBlocksY: number = 13;
		this.game.stage.width = totalBlocksX * 64;
		this.game.stage.height = totalBlocksY * 32;
		this.game.stage.backgroundColor = "#000";
		this.sectorView = new SectorView(this.game, 0, 0, "sectorView", totalBlocksX, totalBlocksY);
		this.sectorView.created(this.blocksKnown);
		// set bg color
		// this.game.stage.backgroundColor = "#4488AA";
		// size game canvas
		// this.game.scale.setGameSize(window.innerWidth, window.innerHeight);//h * 2);
		
		// set game bounds
		// let offset: number = (64 * 64) / 4;
		// this.game.world.setBounds(-offset, -offset, this.game.stage.width + offset, this.game.stage.height + offset);

		// this.game.world.setBounds(-offset, -offset, this.sectorView.gridGroup.width + (offset * 2), this.sectorView.gridGroup.height + (offset * 2));
		// this.game.clearBeforeRender = false; // this negates stage backgroundcolor

	}

}

export { SectorController };
