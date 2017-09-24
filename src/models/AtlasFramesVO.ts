import { AtlasPrefixTypeVO } from "./AtlasPrefixTypesVO";

class AtlasFrameVO {
  private _prefix: AtlasPrefixTypeVO;// = new AtlasPrefixTypeVO();
  private _start: number;
  private _stop: number;
  private _suffix: string;
  private _zeroPad: number;

  /** The filename (sans extension).
   * @member
   * @public
   * @type {string}
   */
  public get prefix(): AtlasPrefixTypeVO {
    return this._prefix;
  }

  public set prefix(value: AtlasPrefixTypeVO) {
    this._prefix = value;
  }

  /** The number to start sequentially counting from.
   * @member
   * @public
   * @type {number}
   */
  public get start(): number {
    return this._start;
  }

  public set start(value: number) {
    this._start = value;
  }

  /** The number to count to.
   * @member
   * @public
   * @type {number}
   */
  public get stop(): number {
    return this._stop;
  }

  public set stop(value: number) {
    this._stop = value;
  }

  /** The end of the file name after the frame number.
   * @member
   * @public
   * @type {string}
   */
  public get suffix(): string {
    return this._suffix;
  }

  public set suffix(value: string) {
    this._suffix = value;
  }

  /** The number of zeros to pad the min and max values with.
   * @member
   * @public
   * @type {number}
   */
  public get zeroPad(): number {
    return this._zeroPad;
  }

  public set zeroPad(value: number) {
    this._zeroPad = value;
  }
  // constructor
  // constructor(data: AtlasFrameVO | {} = {}) {
  constructor(prefix: AtlasPrefixTypeVO, start: number = 0, stop: number, suffix: string = ".png", zeroPad: number = 1) {
    if (prefix) this._prefix = prefix;
    if (start >= 0) this._start = start;
    if (stop >= 0) this._stop = stop;
    if (suffix) this._suffix = suffix;
    if (zeroPad >= 0) this._zeroPad = zeroPad;

    // Object.assign(this, data);
    // if (!this.id) {
    //   this.id = new Date().getTime().toString();
    // }
  }
}

export { AtlasFrameVO };