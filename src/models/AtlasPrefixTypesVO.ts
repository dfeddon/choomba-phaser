// export namespace AtlasPrefixTypes {
// 	export const PREFIX_TYPE_IDLE: string = "idle";
// 	export const PREFIX_TYPE_WALK: string = "walk";
// 	export const PREFIX_TYPE_DEATH: string = "death";
// 	export const PREFIX_TYPE_HIT1: string = "hit1";
// 	export const PREFIX_TYPE_ATTACK1: string = "attack1";
// 	}

class AtlasPrefixTypeVO {
  // constants
  public static readonly PREFIX_TYPE_IDLE: string = "idle";
  public static readonly PREFIX_TYPE_WALK: string = "walk";
  public static readonly PREFIX_TYPE_DEATH: string = "death";
  public static readonly PREFIX_TYPE_HIT1: string = "hit1";
  public static readonly PREFIX_TYPE_ATTACK1: string = "attack1";

  // privates
  private _idle: string;
  private _walk: string;
  private _death: string;
  private _hit1: string;
  private _attack1: string;

  private _prefixKey: string;

  public get idle(): string {
    return this._idle;
  }

  public set idle(value: string) {
    this._idle = value;
    this.prefixKey = AtlasPrefixTypeVO.PREFIX_TYPE_IDLE;
  }

  public get walk(): string {
    return this._walk;
  }

  public set walk(value: string) {
    this._walk = value;
    this.prefixKey = AtlasPrefixTypeVO.PREFIX_TYPE_WALK;
  }

  public get death(): string {
    return this._death;
  }

  public set death(value: string) {
    this._death = value;
    this.prefixKey = AtlasPrefixTypeVO.PREFIX_TYPE_DEATH;
  }

  public get hit1(): string {
    return this._hit1;
  }

  public set hit1(value: string) {
    this._hit1 = value;
    this.prefixKey = AtlasPrefixTypeVO.PREFIX_TYPE_HIT1;
  }

  public get attack1(): string {
    return this._attack1;
  }

  public set attack1(value: string) {
    this._attack1 = value;
    this.prefixKey = AtlasPrefixTypeVO.PREFIX_TYPE_ATTACK1;
  }

  public get prefixKey(): string {
    return this._prefixKey;
  }

  public set prefixKey(value: string) {
    this._prefixKey = value;
  }

  constructor(
    prefix: AtlasPrefixTypeVO,
    type: string,
    value: string | {} = {}
  ) {
    // console.log("constructor", prefix, type, value);
    if (prefix) Object.assign(this, prefix);
    else if (type && value) this[type] = value;
    // if (value) {
    // // this.prefix = new AtlasPrefixTypeVO(prefix);
    // }
  }
}

export { AtlasPrefixTypeVO };