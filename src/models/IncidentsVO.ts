import { AbstractVO } from "./AbstractVO";
import { EntityVO } from "./EntitiesVO";
import { StructureVO } from "./StructuresVO";

class IncidentVO extends AbstractVO {
  // constants
  public static readonly INCIDENT_TYPE_SPAWN: number = 1;
  public static readonly INCIDENT_TYPE_DEFEND: number = 2;
  public static readonly INCIDENT_TYPE_BRAWL: number = 3;
  // public static readonly INCIDENT_TYPE_CREW: number = 4;
  // public static readonly INCIDENT_TYPE_STRUCTURE: number = 5;
  // public static readonly INCIDENT_TYPE_ALLIANCE: number = 6;

  private _id: number;
  private _handle: string;
  private _description: string;
  private _type: number;
  private _structure: StructureVO;
  private _entity: EntityVO;
  private _owner: number; // attacker is dependant upon the type
  private _channel: string;


  constructor(vo: object | {} = {}) {
    super();

    if (vo) Object.assign(this, vo);
  }

	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
    // if (typeof(value) === "string")
    //   value = parseInt(value);
		this._id = value;
	}

  public get handle(): string {
    return this._handle;
  }

  public set handle(value: string) {
    this._handle = value;
  }

  public get description(): string {
    return this._description;
  }

  public set description(value: string) {
    this._description = value;
  }

  public get structure(): StructureVO {
    return this._structure;
  }

  public set structure(value: StructureVO) {
    this._structure = value;
  }

  public get entity(): EntityVO {
    return this._entity;
  }

  public set entity(value: EntityVO) {
    this._entity = value;
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

  public get channel(): string {
    return this._channel;
  }

  public set channel(value: string) {
    this._channel = value;
  }


}

export { IncidentVO };