import { AbstractVO } from "./AbstractVO";
import { CrewVO } from "./CrewsVO";
import { StructureVO } from "./StructuresVO";
import { ArtifactVO } from "./ArtifactsVO";
import { PlayerVO } from "./PlayersVO";
import { CharacterVO } from "./CharactersVO";
import { AllianceVO } from "./AlliancesVO";
import { SectorBlockVO } from "./SectorBlockVO";
import { SectorVO } from "./SectorVO";

/** Entity class defines the base construct of the player's entity/self.
 * @class
 */
class EntityVO extends AbstractVO {
  private _id: number;
  private _owner: PlayerVO;
  private _name: string;
  private _level: number;
  private _alliances: AllianceVO[] = [];
  private _affiliates: AllianceVO[] = [];
  private _characterPool: CharacterVO[] = [];
  private _characters: number[];
  private _properties: StructureVO[] = [];
  private _artifacts: ArtifactVO[] = [];
  private _sector: SectorVO;
  private _blocksKnown: SectorBlockVO[];
  private _hqBlock: SectorBlockVO[];
  private _biz: number;
  private _creds: number;
  private _fame: number;

  // helper functions
  public getCharacterFromPoolById = function(id: number): CharacterVO {
    // console.log("getCharacterFromPoolById", id, typeof(id));

    for (let char of this._characterPool) {
      // console.log(char.id, id);
      if (char.id === id) {
        return char;
      }
    }
  }

  // getters & setters
  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

	public get owner(): PlayerVO {
		return this._owner;
	}

	public set owner(value: PlayerVO) {
		this._owner = value;
	}
  
  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get level(): number {
    return this._level;
  }

  public set level(value: number) {
    this._level = value;
  }

  public get characters(): number[] {
    return this._characters;
  }

  public set characters(value: number[]) {
    this._characters = value;
  }

	public get characterPool(): CharacterVO[] {
		return this._characterPool;
	}

	public set characterPool(value: CharacterVO[]) {
		this._characterPool = value;
  }
  
  public get blocksKnown(): SectorBlockVO[] {
    return this._blocksKnown;
  }

  public set blocksKnown(value: SectorBlockVO[]) {
    this._blocksKnown = value;
  }

	public get alliances(): AllianceVO[]  {
		return this._alliances;
	}

	public set alliances(value: AllianceVO[] ) {
		this._alliances = value;
	}

	public get affiliates(): AllianceVO[]  {
		return this._affiliates;
	}

	public set affiliates(value: AllianceVO[] ) {
		this._affiliates = value;
	}

	public get properties(): StructureVO[]  {
		return this._properties;
	}

	public set properties(value: StructureVO[] ) {
		this._properties = value;
	}

	public get artifacts(): ArtifactVO[]  {
		return this._artifacts;
	}

	public set artifacts(value: ArtifactVO[] ) {
		this._artifacts = value;
	}

	public get sector(): SectorVO {
		return this._sector;
	}

	public set sector(value: SectorVO) {
		this._sector = value;
	}

	public get hqBlock(): SectorBlockVO[] {
		return this._hqBlock;
	}

	public set hqBlock(value: SectorBlockVO[]) {
		this._hqBlock = value;
	}

	public get biz(): number {
		return this._biz;
	}

	public set biz(value: number) {
		this._biz = value;
	}

	public get creds(): number {
		return this._creds;
	}

	public set creds(value: number) {
		this._creds = value;
	}

	public get fame(): number {
		return this._fame;
	}

	public set fame(value: number) {
		this._fame = value;
	}

  constructor(vo: EntityVO | {} = {}) {
    super();

    if (vo) Object.assign(this, vo);
  }


}

export { EntityVO };