import { EntityVO } from './EntitiesVO';
import { CharacterVO } from "./CharactersVO";
import { StructureVO } from "./StructuresVO";
import { AbstractVO } from "./AbstractVO";

/** Entity class.
 * @class
 */
class PlayerVO extends AbstractVO {
  /** Player unique id.
	 * @member
	 * @private
	 * @type {number}
	 */
  // private _uid: number;

  /** Player name.
	 * @member
	 * @private
	 * @type {string}
	 */
  private _name: string;

  /** Player's characters
	 * @member
	 * @private
	 * @type {Array<CharacterVO>}
	 */
  private _characters: Array<CharacterVO>;

  /** Player's structures
	 * @member
	 * @private
	 * @type {Array<StructureVO>}
	 */
  private _structures: Array<StructureVO>;

  /** Players alliances (limit 3).
	 * @member
	 * @private
	 * @type {Array<EntityVO>}
	 */
  private _alliances: Array<EntityVO>;

  private _entities: Array<EntityVO>;

  /** Player name getter.
   * @method
   * @public
   * @returns {string}
   */
  public get name(): string {
    return this._name;
  }

  /** Player name setter.
   * @param {string} value Player's name.
   */
  public set name(value: string) {
    this._name = value;
  }

  /** Player alliances getter.
   * @method
   * @public
   * @returns {Array<EntityVO>}
   */
  public get alliances(): Array<EntityVO> {
    return this._alliances;
  }

  /** Player alliances setter.
   * @param {Array<EntityVO>} value Array of entities.
   */
  public set alliances(value: Array<EntityVO>) {
    this._alliances = value;
  }

  /** Player constructor.
   * @constructor
   * @param {PlayerVO} data may optionally receive a PlayerVO.
   */
  constructor(data: PlayerVO | {} = {}) {
    super();
    Object.assign(this, data);
    // if (!this.id) {
    //   this.id = new Date().getTime().toString();
    // }
  }
}

export { PlayerVO };
