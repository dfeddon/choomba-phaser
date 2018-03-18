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
		console.log('* array', array);
		new SectorBlockService().batchGet(array, {}, (err: any, result: any) => {
			if (err) return console.log(err);
			else {
				console.log("raw result", result);
				for (let block of result) {
					console.log("* block", block);
					this.blocksKnown.push(new SectorBlockVO().fromDatabase(block) as SectorBlockVO);
				}
				console.log('* blocksKnown final', this.blocksKnown);
			}
			// start view
			this.getView();
		});
	}

	getView() {
		let totalBlocksX: number = 64;
		let totalBlocksY: number = 64;
		this.sectorView = new SectorView(this.game, 0, 0, "sectorView", totalBlocksX, totalBlocksY);
		// set bg color
		this.game.stage.backgroundColor = "#000000";
		// size game canvas
		this.game.scale.setGameSize(window.innerWidth, window.innerHeight);//h * 2);
		// set game bounds
		let offset: number = (74 * 74) / 4;
		// this.game.world.setBounds(-offset, -offset, (2500*2) + offset, (2500*2) + offset);
		this.game.world.setBounds(-offset, -offset, this.sectorView.gridGroup.width + (offset * 2), this.sectorView.gridGroup.height + (offset * 2));
	}

}

export { SectorController };
