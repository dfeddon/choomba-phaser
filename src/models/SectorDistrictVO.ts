import { AbstractVO } from "./AbstractVO";
import { VectorVO } from "./VectorsVO";
import { SectorBlockVO } from "./SectorBlockVO";

class SectorDistrictVO extends AbstractVO {

	private _name: string;
	private _index: number; // 1 - 8 (128 square blocks)
	private _width: number; // 128 * 64
	private _height: number; // 128 * 64
	private _blockSize: number; // 64
	private _vector: VectorVO; // x: index - 1 * width, y: index - 1 * height
	private _blocks: SectorBlockVO[] = []; // 512 total blocks
	// private _blocks: object[];

	constructor(data?: object | {}, index?: number, name?: string) {
		super();

		if (data)
			Object.assign(this, data);

		if (name)
		this._name = name;

		if (index)
			this._index = index;

		// this._blocks = [];
	}

	addBlock(block: SectorBlockVO) {
		this._blocks.push(block);
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}

	public get index(): number {
		return this._index;
	}

	public set index(value: number) {
		this._index = value;
	}

	public get blocks(): SectorBlockVO[] {
		return this._blocks;
	}

	public set blocks(value: SectorBlockVO[]) {
		this._blocks = value;
	}
	
}

export { SectorDistrictVO };
