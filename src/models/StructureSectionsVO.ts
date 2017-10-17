import { AbstractVO } from "./AbstractVO";
import { ArtifactVO } from "./ArtifactsVO";
import { SecurityVO } from "./SecurityVO";
import { ObjectVO } from "./ObjectsVO";

class StructureSectionVO extends AbstractVO {
  public static readonly STRUCTURE_SECTION_CORRIDOR: number = 1;
  public static readonly STRUCTURE_SECTION_ROOM: number = 2;

  private _type: number;
  private _security: SecurityVO;
  private _artifact: ArtifactVO;
  private _object: ObjectVO;

  constructor() {
    super();
  }
}

export { StructureSectionVO };
