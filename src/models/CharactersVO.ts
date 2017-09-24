import { AttributeVO } from "./AttributesVO";
import { AtlasVO } from "./AtlasVO";
import { VectorVO } from "./VectorsVO";

class CharacterVO {
  // privates
  private _uid: number;
  private _name: string;
  private _role: number;
  private _attributes: AttributeVO;
  private _atlas: AtlasVO;
  private _key: string;
  private _vector: VectorVO;

  // getters/setters
  /** Character's unqiue id
   * @member
   * @private
   * @type {number}
   */
  public get uid(): number {
    return this._uid;
  }

  public set uid(value: number) {
    this._uid = value;
  }

  /** Character's name
   * @member
   * @private
   * @type {string}
   */
  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  /** Character's role
   * @member
   * @private
   * @type {number}
   */
  public get role(): number {
    return this._role;
  }

  public set role(value: number) {
    this._role = value;
  }

  /** Character's attributes.
   * @member
   * @private
   * @type {AttributeVO}
   */
  public get attributes(): AttributeVO {
    return this._attributes;
  }

  public set attributes(value: AttributeVO) {
    this._attributes = value;
  }

  /** Character's atlas data.
   * @member
   * @private
   * @type {AttributeVO}
   */
  public get atlas(): AtlasVO {
    return this._atlas;
  }

  public set atlas(value: AtlasVO) {
    this._atlas = value;
  }

  /** Character's atlas key.
   * @member
   * @private
   * @type {string}
   */
  public get key(): string {
    return this._key;
  }

  public set key(value: string) {
    this._key = value;
  }

	public get vector(): VectorVO {
		return this._vector;
	}

	public set vector(value: VectorVO) {
		this._vector = value;
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