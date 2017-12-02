import { AttributeVO } from "./AttributesVO";
import { AtlasVO } from "./AtlasVO";
import { VectorVO } from "./VectorsVO";
import { AtlasPrefixTypeVO } from "./AtlasPrefixTypesVO";
import { AtlasFrameVO } from "./AtlasFramesVO";
import * as jsonData from "../public/assets/atlas.json";
import { CharacterCombatVO } from "./CharacterCombatVO";
import { AbstractVO } from "./AbstractVO";
import CharacterView from "../views/CharacterViews";
import * as NameGenerator from "fantastical";

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
  private _owner: number;
  private _view: CharacterView;

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

  /** Character's class
   * @member
   * @private
   * @type {number}
   */
  public get class(): number {
    return this._role;
  }

  public set class(value: number) {
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

  public get view(): CharacterView {
    return this._view;
  }

  public set view(value: CharacterView) {
    this._view = value;
  }

  // constructor
  constructor(key: string, name?: string, vector?: VectorVO) {
    super();
    console.log("* CharacterVO constructor");
    this.key = key;
    if (name)
      this.name = name;
    else this.name = NameGenerator.species.human(false);
    console.log("* character name:", this.name);
    this.vector = vector;

    // combat
    this._characterCombat = new CharacterCombatVO();

    this.atlas = new AtlasVO();
    // define animation keys
    console.log("* data", jsonData);
    var json: JSON = (<any>jsonData).characters;
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
      frame = new AtlasFrameVO(
        prefix,
        data.start,
        data.stop,
        data.suffix,
        data.zeroPad
      );
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