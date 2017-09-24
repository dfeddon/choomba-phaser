// import { AtlasPrefixTypeVO } from "./AtlasPrefixTypesVO";
import { AtlasFrameVO } from "./AtlasFramesVO";

class AtlasVO {
  private _frames: Array<AtlasFrameVO> = [];
  private _keys: Array<string> = [];
  private _frameRate: number;
  private _loop: boolean;
  private _useNumericIndex: boolean;

  // getters & setters
  public get frames(): Array<AtlasFrameVO> {
    return this._frames;
  }

  public set frames(value: Array<AtlasFrameVO>) {
    this._frames = value;
  }

  public get keys(): Array<string> {
    return this._keys;
  }

  public set keys(value: Array<string>) {
    this._keys = value;
  }

	public get frameRate(): number {
		return this._frameRate;
	}

	public set frameRate(value: number) {
		this._frameRate = value;
	}

	public get loop(): boolean {
		return this._loop;
	}

	public set loop(value: boolean) {
		this._loop = value;
	}

	public get useNumericIndex(): boolean {
		return this._useNumericIndex;
	}

	public set useNumericIndex(value: boolean) {
		this._useNumericIndex = value;
	}

  // constuctor
  constructor(frames?: Array<AtlasFrameVO>, keys?: Array<string>, frameRate: number = 10, loop: boolean = true, useNumericIndex: boolean = false) {

    // Object.assign(this, data);
  }
  // public fnc
  // public getFrameByPrefix(prefix: string): AtlasFrameVO {
  //   console.log("prefix", prefix);
  //   var returnItem;
  //   for (let i of this.frames) {
  //     console.log('i', i, 'frames', this.frames);
  //     if (String(i.prefix) === prefix) {
  //       console.log("* we found", prefix);
  //       returnItem = i;
  //     }
  //   }
  //   if (!returnItem)
  //     console.log("* no item to return");
  //   return returnItem;
  // }
}

export { AtlasVO };