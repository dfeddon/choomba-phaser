import { AbstractVO } from "./AbstractVO";
import { VectorVO } from "./VectorsVO";
import { SectorDistrictVO } from "./SectorDistrictVO";
import { isNumber } from "util";

class SectorBlockVO extends AbstractVO {

	public static readonly BUILDING_TYPE_HEADQUARTERS: number = 1;
	public static readonly BUILDING_TYPE_WAREHOUSE: number = 2;
	public static readonly BUILDING_TYPE_SILO: number = 3;
	public static readonly BUILDING_TYPE_DRUG_DEN: number = 4;
	public static readonly BUILDING_TYPE_SLUM: number = 5;
	public static readonly BUILDING_TYPE_FACTORY: number = 6;
	public static readonly BUILDING_TYPE_CHEMLAB: number = 7;

	// private _sector: SectorVO;
	private _vector: VectorVO;
	private _district: SectorDistrictVO;
	private _index: number;
	private _type: number;
	private _owner: number;
	private _isKnown: boolean;

	constructor(data?: object | {}, generateId?: boolean) {
		if (generateId === undefined)
			generateId = true;

		super(generateId);

		if (data)
			Object.assign(this, data);
		
		if (!this.isKnown)
			this.isKnown = false;
	}

	fromDatabase(data: object): object {
		var instance: SectorBlockVO = new SectorBlockVO({}, false);
		// instantiate subclasses
		instance.vector = new VectorVO(0, 0);
		instance.district = new SectorDistrictVO();
		// convert db object to model
		let vo: object = super.fromDatabase(data, instance);
		return vo;
	}

	create(district: SectorDistrictVO, index?: number, type?: number) {
		// super();

		this._district = district;
		if (index) this._index = index;
		if (type) this._type = type;

		return this;
	}

	public get district(): SectorDistrictVO {
		return this._district;
	}

	public set district(value: SectorDistrictVO) {
		this._district = value;
	}

	// public set sector(value: SectorVO) {
	// 	this._district = value;
	// }

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

	public get isKnown(): boolean {
		return this._isKnown;
	}

	public set isKnown(value: boolean) {
		this._isKnown = value;
	}
}

export { SectorBlockVO };
