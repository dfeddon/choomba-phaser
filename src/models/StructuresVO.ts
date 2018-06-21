import { AbstractVO } from "./AbstractVO";
import { StructureSectionVO } from "./StructureSectionsVO";

class StructureVO extends AbstractVO {
	// private _id: number;
	private _level: number;
	private _sections: StructureSectionVO[];
	
	// id, name, type, img, manager_id, level
	// data[] (production slots)
	// status (leased, outsourced, condemned)
	// grade (prototype, alpha, beta, rc)
	// stage
	// owner
	// phase (max phases is determined by grade?)

	constructor() {
		super();
	}

	// public get id(): number {
	// 	return this._id;
	// }

	// public set id(value: number) {
	// 	this._id = value;
	// }

	public get level(): number {
		return this._level;
	}

	public set level(value: number) {
		this._level = value;
	}

	public get sections(): StructureSectionVO[] {
		return this._sections;
	}

	public set sections(value: StructureSectionVO[]) {
		this._sections = value;
	}

}

export { StructureVO };