import { AbstractVO } from "./AbstractVO";
import { StructureSectionVO } from "./StructureSectionsVO";

class StructureVO extends AbstractVO {
	private level: number;
	private sections: StructureSectionVO[];

	constructor() {
		super();
	}
}

export { StructureVO };