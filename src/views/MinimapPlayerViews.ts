import { MinimapPlayerVO } from "../models/MinimapPlayersVO";

export default class MinimapPlayerView extends Phaser.Sprite {

	private _vo: MinimapPlayerVO;

	public get vo(): MinimapPlayerVO {
		return this._vo;
	}

	public set vo(value: MinimapPlayerVO) {
		this._vo = value;
	}

	constructor(game: Phaser.Game, vo:MinimapPlayerVO) {
		super(game, vo.vector.x, vo.vector.y, vo.key, 0);
		this._vo = vo;
	}
}
