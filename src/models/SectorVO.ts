import { AbstractVO } from "./AbstractVO";
import { VectorVO } from "./VectorsVO";

class SectorVO extends AbstractVO {

	private _name: string;
	private _width: number;
	private _height: number;
	private _blockSize: number;
	private _vector: object;
	// private _blocks: object[];

	constructor(name: string, width: number, height: number, blockSize: number, vector?: VectorVO) {
		super();
	}
}

export { SectorVO };
