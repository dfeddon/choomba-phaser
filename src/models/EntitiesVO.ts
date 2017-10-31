import { AbstractVO } from "./AbstractVO";
import { CrewVO } from "./CrewsVO";
import { StructureVO } from "./StructuresVO";
import { ArtifactVO } from "./ArtifactsVO";
import { AllianceVO } from "./AlliancesVO";
import { PlayerVO } from "./PlayersVO";

/** Entity class defines the base construct of the player's entity/self.
 * @class
 */
class EntityVO extends AbstractVO {
  private _owner: PlayerVO;
  private _name: string;
  private _level: number;
  private _members: EntityVO[];
  private _alliances: AllianceVO[];
  private _affiliates: EntityVO[];
  private _properties: StructureVO[];
  private _artifacts: ArtifactVO[];
  private _crew: CrewVO;
  private _biz: number;
  private _creds: number;
  private _fame: number;


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

  public get crew(): CrewVO {
    return this._crew;
  }

  public set crew(value: CrewVO) {
    this._crew = value;
  }

  /** entity constructor
   * @constructor
   * @param {EntityVO} data may optionally receive an EntityVO
   */
  constructor() {
    //data: EntityVO | {} = {}) {
    super();
    // Object.assign(this, data);
  }
}

export { EntityVO };