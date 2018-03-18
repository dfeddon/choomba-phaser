// import { AttributeVO } from "./AttributesVO";
import { AtlasVO } from "./AtlasVO";
import { VectorVO } from "./VectorsVO";
// import { AtlasPrefixTypeVO } from "./AtlasPrefixTypesVO";
// import { AtlasFrameVO } from "./AtlasFramesVO";
// import * as jsonData from "../public/assets/atlas.json";
import { CharacterCombatVO } from "./CharacterCombatVO";
import { AbstractVO } from "./AbstractVO";
import CharacterView from "../views/CharacterViews";
import * as NameGenerator from "fantastical";
import { NumberHelper } from "../helpers/NumberHelper";
import { CharactersSchema } from "../services/Schemas/CharactersSchema";
import { AWSService } from "../services/AWSService";
import { CharacterService } from "../services/CharacterService";

class CharacterVO extends AbstractVO {

  public static readonly CHARACTER_ROLE_CHROMER: number = 1;
  public static readonly CHARACTER_ROLE_ANARCHIST: number = 2;
  public static readonly CHARACTER_ROLE_MEDIC: number = 3;
  public static readonly CHARACTER_ROLE_CLEANER: number = 4;
  public static readonly CHARACTER_ROLE_HACKER: number = 5;
  public static readonly CHARACTER_ROLE_RIGGER: number = 6;
  public static readonly CHARACTER_ROLE_BOOSTER: number = 7;
  public static readonly CHARACTER_ROLE_TWEAKER: number = 8;

  public static readonly CHARACTER_STATUS_AVAILABLE: number = 1;
  public static readonly CHARACTER_STATUS_UNAVAILABLE: number = 2;
  public static readonly CHARACTER_STATUS_DECEASED: number = 3;
  
  // privates
  // private _uid: number;
  // private _id: number;
  private _handle: string;
  private _role: number;
  private _owner: number;
  private _position: number = 0;
  private _status: number = CharacterVO.CHARACTER_STATUS_AVAILABLE;
  private _characterCombat: CharacterCombatVO;

  // private _attributes: AttributeVO;
  private _grit: number;
  private _reflexes: number;
  private _focus: number;
  private _cybermancy: number;
  private _meat: number;
  
  // private _atlas: AtlasVO;
  private _key: string;
  private _vector: VectorVO;
  private _view: CharacterView;

  // constructor
  constructor(vo?: CharacterVO) {
    super();
    // console.log("-- init start", this._init);
    if (vo) Object.assign(this, vo);
    this._initializing = false;
    
    console.log("-- init end");

    if (!this._handle)
      this._handle = NameGenerator.species.human(false);
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
    this._role = role;

    // status available
    this._status = CharacterVO.CHARACTER_STATUS_AVAILABLE;

    // generate uid
    // if (!this.id)
    //   this._id = NumberHelper.UIDGenerator();

    // first, randomly assign values to all attributs (from 1 - 18/100?)
    this._grit = NumberHelper.randomRange(0, 50);
    this._reflexes = NumberHelper.randomRange(0, 50);
    this._focus = NumberHelper.randomRange(0, 50);
    this._meat = NumberHelper.randomRange(0, 50);
    this._cybermancy = NumberHelper.randomRange(0, 50);

    // boost role-based attributes
    switch(this._role) {
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
      case CharacterVO.CHARACTER_ROLE_HACKER: // [DOTS] reflexes, cybermancy (midline)
        this._reflexes = 50 + NumberHelper.randomRange(0, 50);
        this._cybermancy = 50 + NumberHelper.randomRange(0, 50);
        break;
      case CharacterVO.CHARACTER_ROLE_RIGGER: // [AOE] focus, cybermancy (midline)
        this._focus = 50 + NumberHelper.randomRange(0, 50);
        this._cybermancy = 50 + NumberHelper.randomRange(0, 50);
        break;
      case CharacterVO.CHARACTER_ROLE_BOOSTER: // [BUFFS] grit, cybermancy (midline)
        this._grit = 50 + NumberHelper.randomRange(0, 50);
        this._cybermancy = 50 + NumberHelper.randomRange(0, 50);
        break;
      case CharacterVO.CHARACTER_ROLE_TWEAKER: // [DEBUFFS] meat, cybermancy (midline)
        this._meat = 50 + NumberHelper.randomRange(0, 50);
        this._cybermancy = 50 + NumberHelper.randomRange(0, 50);
        break;
    }
    return this;
  }

  getLabelByRole(): string {
    // console.log("== getLabelByRole ==", this._role);
    var label: string = "none";

    if (!this._role)
      return "Unnamed";

    switch (this._role) {
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
      case CharacterVO.CHARACTER_ROLE_HACKER: // [DOTS] reflexes, cybermancy (midline)
        label = "Hacker";
        break;
      case CharacterVO.CHARACTER_ROLE_RIGGER: // [AOE] focus, cybermancy (midline)
        label = "Rigger";
        break;
      case CharacterVO.CHARACTER_ROLE_BOOSTER: // [BUFFS] grit, cybermancy (midline)
        label = "Booster";
        break;
      case CharacterVO.CHARACTER_ROLE_TWEAKER: // [DEBUFFS] meat, cybermancy (midline)
        label = "Tweaker";
        break;
    }
    return label;
  }

  // getters/setters

	// public get id(): number {
	// 	return this._id;
	// }

	// public set id(value: number) {
	// 	this._id = value;
	// }
  
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

  /** Character's handle
   * @member
   * @private
   * @type {string}
   */
  public get handle(): string {
    return this._handle;
  }

  public set handle(value: string) {
    this._handle = value;
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
    switch(value) {
      case CharacterVO.CHARACTER_ROLE_ANARCHIST:
        this._key = "steampunk02"
      break;
      case CharacterVO.CHARACTER_ROLE_BOOSTER:
        this._key = "steampunk01";
      break;
      case CharacterVO.CHARACTER_ROLE_CHROMER:
        this._key = "steampunk01";
      break;
      case CharacterVO.CHARACTER_ROLE_CLEANER:
        this._key = "robot01";
      break;
      case CharacterVO.CHARACTER_ROLE_HACKER:
        this._key = "steampunk01";
      break;
      case CharacterVO.CHARACTER_ROLE_MEDIC:
        this._key = "robot01";
      break;
      case CharacterVO.CHARACTER_ROLE_RIGGER:
        this._key = "steampunk02";
      break;
      case CharacterVO.CHARACTER_ROLE_TWEAKER:
        this._key = "robot01";
      break;
    }
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

	public get cybermancy(): number {
		return this._cybermancy;
	}

	public set cybermancy(value: number) {
		this._cybermancy = value;
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
    console.log("* set position", value);
    // update service
    if (!this._initializing) {
      this.update(AWSService.getInstance().dynamoose, new CharactersSchema(), "position");
    }
	}

	public get status(): number {
		return this._status;
	}

	public set status(value: number) {
		this._status = value;
	}

}

export { CharacterVO };