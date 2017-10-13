import { AbstractVO } from "./AbstractVO";
import { CrewVO } from "./CrewsVO";

/** Entity class defines the base construct of the player's self.
 * @class
 */
class EntityVO extends AbstractVO {

  /** entity name
	 * @member
	 * @private
	 * @type {string}
	 */
  private _name: string;

  /** entity level
	 * @member
	 * @private
	 * @type {number}
	 */
  private _level: number;

  private _crew: CrewVO;
//   private _rivals: Array<EntityVO>;

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
  constructor() { //data: EntityVO | {} = {}) {
    super();
    // Object.assign(this, data);
  }
}

export { EntityVO };