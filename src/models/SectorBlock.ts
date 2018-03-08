import { AbstractVO } from "./AbstractVO";

class SectorBlockVO extends AbstractVO {

	public static readonly BUILDING_TYPE_WAREHOUSE: number = 1;
	public static readonly BUILDING_TYPE_FACTORY: number = 2;
	public static readonly BUILDING_TYPE_CHEMLAB: number = 3;

	private _vector: object; // vector {x:val, y:val}
	private _type: number;
	private _owner: number;

	constructor() {
		super();
	}
}

export { SectorBlockVO };
