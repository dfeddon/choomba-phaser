import { AttributeVO } from "./AttributesVO";
import { AtlasVO } from "./AtlasVO";
import { VectorVO } from "./VectorsVO";
import { AtlasPrefixTypeVO } from "./AtlasPrefixTypesVO";
import { AtlasFrameVO } from "./AtlasFramesVO";
import * as jsonData from "../public/assets/atlas.json";
import { CharacterCombatVO } from "./CharacterCombatVO";
import { AbstractVO } from "./AbstractVO";

class CharacterVO extends AbstractVO {
  // privates
  // private _uid: number;
  private _name: string;
  private _role: number;
  private _attributes: AttributeVO;
  private _atlas: AtlasVO;
  private _key: string;
  private _vector: VectorVO;
  private _characterCombat: CharacterCombatVO;

  // getters/setters
  /** Character's unqiue id
   * @member
   * @private
   * @type {number}
   */
  // public get uid(): number {
  //   return this._uid;
  // }

  // public set uid(value: number) {
  //   this._uid = value;
  // }

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

	public get characterCombat(): CharacterCombatVO {
		return this._characterCombat;
	}

	public set characterCombat(value: CharacterCombatVO) {
		this._characterCombat = value;
	}

  // constructor
  constructor(key: string, name: string, vector: VectorVO) {
    super();
    console.log("* CharacterVO constructor");
    this.key = key;
    this.name = name;
    this.vector = vector;

    this.atlas = new AtlasVO();
    // define animation keys
    console.log("* data", jsonData);
    var json:JSON = (<any>jsonData).characters;
    console.log("* json", json);
    for (var i in json[this.key]) {
      // console.log(i);
      this.atlas.keys.push(i);
    }
    // define animations
    var data, prefix, frame;
    for (var j in this.atlas.keys) {
      // set data
      data = json[this.key][this.atlas.keys[j]];
      // instantiate prefix
      prefix = new AtlasPrefixTypeVO(null, this.atlas.keys[j], data.prefix);
      // instatiate frame
      frame = new AtlasFrameVO(prefix, data.start, data.stop, data.suffix, data.zeroPad);
      // add to animation frames
      this.atlas.frames.push(frame);
    }
    // Object.assign(this, data);
    // if (!this.id) {
    //   this.id = new Date().getTime().toString();
    // }
  }
}

export { CharacterVO };