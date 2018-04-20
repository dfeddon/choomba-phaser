import { AbstractVO } from "./AbstractVO";
import { VectorVO } from "./VectorsVO";
import { SectorDistrictVO } from "./SectorDistrictVO";

class SectorVO extends AbstractVO {
	public static readonly SECTOR_BLOCK_SIZE: number = 64;
	public static readonly SECTOR_TOTAL_BLOCKS: number = 64 * 64;
	public static readonly SECTOR_SIZE: number = 64 * SectorVO.SECTOR_BLOCK_SIZE;
	public static readonly SECTOR_DISTRICTS_TOTAL: number = SectorVO.SECTOR_TOTAL_BLOCKS / 256; // (4 x 4 rows/columns => 16 total)
	public static readonly SECTOR_DISTRICTS_SIZE: number = SectorVO.SECTOR_DISTRICTS_TOTAL / 16 * SectorVO.SECTOR_BLOCK_SIZE;
	public static readonly SECTOR_INDEX_BASE_VALUE: number = 100;

	private _name: string;
	private _index: number;
	// private _width: number;
	// private _height: number;
	// private _blockSize: number;
	// private _vector: VectorVO;
	private _districts: SectorDistrictVO[] = []; // 8 (each containing 512 blocks)

	constructor(data?: object | {}, index?: number, name?: string) { //, width: number, height: number, blockSize: number, vector?: VectorVO) {
		super();

		if (data)
			Object.assign(this, data);
		if (name)
			this._name = name;
		if (index)
			this._index = index;
		// this._width = width;
		// this._height = height;
		// this._blockSize = blockSize;
		// if (vector) this._vector = vector;
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

	public get districts(): SectorDistrictVO[] {
		return this._districts;
	}

	public set districts(value: SectorDistrictVO[]) {
		this._districts = value;
	}
}

export { SectorVO };
