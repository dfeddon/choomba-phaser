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
import { NumberHelper } from "../helpers/NumberHelper";

class CharacterVO extends AbstractVO {

  public static readonly CHARACTER_ROLE_CHROMER: number = 1;
  public static readonly CHARACTER_ROLE_ANARCHIST: number = 2;
  public static readonly CHARACTER_ROLE_MEDIC: number = 3;
  public static readonly CHARACTER_ROLE_CLEANER: number = 4;
  public static readonly CHARACTER_ROLE_HACKER: number = 5;
  public static readonly CHARACTER_ROLE_RIGGER: number = 6;
  public static readonly CHARACTER_ROLE_BOOSTER: number = 7;
  public static readonly CHARACTER_ROLE_TWEAKER: number = 8;
  
  // privates
  // private _uid: number;
  private _id: number;
  private _name: string;
  private _role: number;
  private _owner: number;
  private _position: number;
  private _characterCombat: CharacterCombatVO;

  // private _attributes: AttributeVO;
  private _grit: number;
  private _reflexes: number;
  private _focus: number;
  private _neuromancy: number;
  private _meat: number;
  
  private _atlas: AtlasVO;
  private _key: string;
  private _vector: VectorVO;
  private _view: CharacterView;

  // constructor
  constructor(key?: string, name?: string, vector?: VectorVO) {
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

  createCharacter(role?: number): CharacterVO {
    console.log("* characterVO.createCharacter()", role);

    // var helper: NumberHelper = new NumberHelper();

    // if no role, assign one randomly
    if (!role) {
      role = NumberHelper.randomRange(1, 8);
      console.log("* role", role);
    }
    // set role
    this.role = role;

    // generate uid
    if (!this.id)
      this.id = NumberHelper.UIDGenerator();

    // first, randomly assign values to all attributs (from 1 - 18/100?)
    this._grit = NumberHelper.randomRange(0, 50);
    this._reflexes = NumberHelper.randomRange(0, 50);
    this._focus = NumberHelper.randomRange(0, 50);
    this._meat = NumberHelper.randomRange(0, 50);
    this._neuromancy = NumberHelper.randomRange(0, 50);

    // boost role-based attributes
    switch(this.role) {
      case CharacterVO.CHARACTER_ROLE_CHROMER: // [TANK] meat, grit (frontline)
        this._meat = 50 + NumberHelper.randomRange(0, 50);
        this._grit = 50 + NumberHelper.randomRange(0, 50);
        break;
      case CharacterVO.CHARACTER_ROLE_ANARCHIST: // [GLASS CANNON] grit, reflexes (frontline)
        this._grit = 50 + NumberHelper.randomRange(0, 50);
        this._reflexes = 50 + NumberHelper.randomRange(0, 50);
        break;
      case CharacterVO.CHARACTER_ROLE_MEDIC: // [HEALER] focus, meat (backline)
        this._focus = 50 + NumberHelper.randomRange(0, 50);
        this._meat = 50 + NumberHelper.randomRange(0, 50);
        break;
      case CharacterVO.CHARACTER_ROLE_CLEANER: // [CLEANSER] focus, meat (backline)
        this._focus = 50 + NumberHelper.randomRange(0, 50);
        this._meat = 50 + NumberHelper.randomRange(0, 50);
        break;
      case CharacterVO.CHARACTER_ROLE_HACKER: // [DOTS] reflexes, neuromancy (midline)
        this._reflexes = 50 + NumberHelper.randomRange(0, 50);
        this._neuromancy = 50 + NumberHelper.randomRange(0, 50);
        break;
      case CharacterVO.CHARACTER_ROLE_RIGGER: // [AOE] focus, neuromancy (midline)
        this._focus = 50 + NumberHelper.randomRange(0, 50);
        this._neuromancy = 50 + NumberHelper.randomRange(0, 50);
        break;
      case CharacterVO.CHARACTER_ROLE_BOOSTER: // [BUFFS] grit, neuromancy (midline)
        this._grit = 50 + NumberHelper.randomRange(0, 50);
        this._neuromancy = 50 + NumberHelper.randomRange(0, 50);
        break;
      case CharacterVO.CHARACTER_ROLE_TWEAKER: // [DEBUFFS] meat, neuromancy (midline)
        this._meat = 50 + NumberHelper.randomRange(0, 50);
        this._neuromancy = 50 + NumberHelper.randomRange(0, 50);
        break;
    }
    return this;
  }

  getLabelByRole(): string {
    // console.log("== getLabelByRole ==", this._role);
    var label: string = "none";

    if (!this.role)
      return "Unnamed";

    switch (this.role) {
      case CharacterVO.CHARACTER_ROLE_CHROMER: // [TANK] meat, grit (frontline)
        label = "Chromer";
        break;
      case CharacterVO.CHARACTER_ROLE_ANARCHIST: // [GLASS CANNON] grit, reflexes (frontline)
        label = "Anarchist";
        break;
      case CharacterVO.CHARACTER_ROLE_MEDIC: // [HEALER] focus, meat (backline)
        label = "Medic";
        break;
      case CharacterVO.CHARACTER_ROLE_CLEANER: // [CLEANSER] focus, meat (backline)
        label = "Cleaner";
        break;
      case CharacterVO.CHARACTER_ROLE_HACKER: // [DOTS] reflexes, neuromancy (midline)
        label = "Hacker";
        break;
      case CharacterVO.CHARACTER_ROLE_RIGGER: // [AOE] focus, neuromancy (midline)
        label = "Rigger";
        break;
      case CharacterVO.CHARACTER_ROLE_BOOSTER: // [BUFFS] grit, neuromancy (midline)
        label = "Booster";
        break;
      case CharacterVO.CHARACTER_ROLE_TWEAKER: // [DEBUFFS] meat, neuromancy (midline)
        label = "Tweaker";
        break;
    }
    return label;
  }
  toObject(): object {
    var obj: any = {};
    obj.id = this.id;
    obj.name = this.name;
    obj.role = this.role;
    obj.position = this.position;
    obj.grit = this.grit;
    obj.reflexes = this.reflexes;
    obj.focus = this.focus;
    obj.neuromancy = this.neuromancy;
    obj.meat = this.meat;
    return obj;
  }
  // getters/setters

	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}
  
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

  // /** Character's attributes.
  //  * @member
  //  * @private
  //  * @type {AttributeVO}
  //  */
  // public get attributes(): AttributeVO {
  //   return this._attributes;
  // }

  // public set attributes(value: AttributeVO) {
  //   this._attributes = value;
  // }

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

	public get owner(): number {
		return this._owner;
	}

	public set owner(value: number) {
		this._owner = value;
	}

	public get grit(): number {
		return this._grit;
	}

	public set grit(value: number) {
		this._grit = value;
	}

	public get reflexes(): number {
		return this._reflexes;
	}

	public set reflexes(value: number) {
		this._reflexes = value;
	}

	public get focus(): number {
		return this._focus;
	}

	public set focus(value: number) {
		this._focus = value;
	}

	public get neuromancy(): number {
		return this._neuromancy;
	}

	public set neuromancy(value: number) {
		this._neuromancy = value;
	}

	public get meat(): number {
		return this._meat;
	}

	public set meat(value: number) {
		this._meat = value;
	}

	public get position(): number {
		return this._position;
	}

	public set position(value: number) {
		this._position = value;
	}

}

export { CharacterVO };