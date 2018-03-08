import { AbstractVO } from "./AbstractVO";

class SectorVO extends AbstractVO {

	private _name: string;
	private _vector: object;
	private _blocks: object[];

	constructor() {
		super();
	}
}

export { SectorVO };
