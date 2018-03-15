import { AbstractVO } from "./AbstractVO";
import { VectorVO } from "./VectorsVO";
import { SectorVO } from "./SectorVO";

class SectorBlockVO extends AbstractVO {

	public static readonly BUILDING_TYPE_HEADQUARTERS: number = 1;
	public static readonly BUILDING_TYPE_WAREHOUSE: number = 2;
	public static readonly BUILDING_TYPE_SILO: number = 3;
	public static readonly BUILDING_TYPE_DRUG_DEN: number = 4;
	public static readonly BUILDING_TYPE_SLUM: number = 5;
	public static readonly BUILDING_TYPE_FACTORY: number = 6;
	public static readonly BUILDING_TYPE_CHEMLAB: number = 7;

	private _sector: SectorVO;
	private _vector: VectorVO;
	private _index: number;
	private _type: number;
	private _owner: number;

	public get sector(): SectorVO {
		return this._sector;
	}

	public set sector(value: SectorVO) {
		this._sector = value;
	}

	public get vector(): VectorVO {
		return this._vector;
	}

	public set vector(value: VectorVO) {
		this._vector = value;
	}

	public get index(): number {
		return this._index;
	}

	public set index(value: number) {
		this._index = value;
	}

	public get type(): number {
		return this._type;
	}

	public set type(value: number) {
		this._type = value;
	}

	public get owner(): number {
		return this._owner;
	}

	public set owner(value: number) {
		this._owner = value;
	}
	
	constructor(sector: number, index?: number, type?: number) {
		super();
	}
}

export { SectorBlockVO };
