
/** Entity class defines the base construct of the player's self.
 * @class
 */
class EntityVO {
  /** entity uid
	 * @member
	 * @private
	 * @type {number}
	 */
  private _uid: number;

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
//   private _rivals: Array<EntityVO>;

  /** uid getter
   * @method
   * @public
   */
  public get $uid(): number {
    return this._uid;
  }

  /** uid setter
   * @param {number} value Set entity's uid.
   */
  public set $uid(value: number) {
    this._uid = value;
  }

  /** name getter
   * @method
   * @public
   * @returns {string}
   */
  public get $name(): string {
    return this._name;
  }

  /** name setter
   * @param {string} value Entity's name.
   */
  public set $name(value: string) {
    this._name = value;
  }

  /** level getter
   * @method
   * @public
   * @returns {number}
   */
  public get $level(): number {
    return this._level;
  }

  /** level setter
   * @method
   * @public
   * @param {number} value Entity's level
   */
  public set $level(value: number) {
    this._level = value;
  }

  /** entity constructor
   * @constructor
   * @param {EntityVO} data may optionally receive an EntityVO
   */
  constructor(data: EntityVO | {} = {}) {
    Object.assign(this, data);
  }
}

export { EntityVO };