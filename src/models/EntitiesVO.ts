import { AbstractVO } from "./AbstractVO";
import { CrewVO } from "./CrewsVO";
import { StructureVO } from "./StructuresVO";
import { ArtifactVO } from "./ArtifactsVO";
import { PlayerVO } from "./PlayersVO";
import { CharacterVO } from "./CharactersVO";
import { AllianceVO } from "./AlliancesVO";
import { SectorBlockVO } from "./SectorBlockVO";

/** Entity class defines the base construct of the player's entity/self.
 * @class
 */
class EntityVO extends AbstractVO {
  private _id: number;
  private _owner: PlayerVO;
  private _name: string;
  private _level: number;
  // private _members: EntityVO[];
  private _alliances: AllianceVO[] = [];
  private _affiliates: AllianceVO[] = [];
  private _characterPool: CharacterVO[] = [];
  private _characters: number[];
  private _properties: StructureVO[] = [];
  private _artifacts: ArtifactVO[] = [];
  private _blocksKnown: SectorBlockVO[];
  // private _crew: CrewVO;
  private _biz: number;
  private _creds: number;
  private _fame: number;


  /** entity constructor
   * @constructor
   * @param {EntityVO} data may optionally receive an EntityVO
   */
  constructor(vo: EntityVO | {} = {}) {
    super();

    if (vo) Object.assign(this, vo);
  }

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
  
  /** name getter
   * @method
   * @public
   * @returns {string}
   */

  public get name(): string {
    return this._name;
  }

  /** name setter
   * @param {string} value Entity's name.
   */
  public set name(value: string) {
    this._name = value;
  }

  /** level getter
   * @method
   * @public
   * @returns {number}
   */
  public get level(): number {
    return this._level;
  }

  /** level setter
   * @method
   * @public
   * @param {number} value Entity's level
   */
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
  
}

export { EntityVO };