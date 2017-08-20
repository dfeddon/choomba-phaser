import { AttributeVO } from "./Attributes";

class CharacterVO {
  // privates
  /** Player's unqiue id
   * @member
   * @private
   * @type {number}
   */
  private _uid: number;

  /** Player's name
   * @member
   * @private
   * @type {string}
   */
  private _name: string;

  /** Player's class
   * @member
   * @private
   * @type {number}
   */
  private _class: number;

  /** Player's attributes.
   * @member
   * @private
   * @type {AttributeVO}
   */
  private _attributes: AttributeVO;

  // getters/setters
  public get uid(): number {
    return this._uid;
  }

  public set uid(value: number) {
    this._uid = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get class(): number {
    return this._class;
  }

  public set class(value: number) {
    this._class = value;
  }

  // constructor
  constructor(data: CharacterVO | {} = {}) {
    Object.assign(this, data);
    // if (!this.id) {
    //   this.id = new Date().getTime().toString();
    // }
  }
}

export { CharacterVO };