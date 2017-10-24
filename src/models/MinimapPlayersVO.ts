import { AbstractVO } from "./AbstractVO";
import { VectorVO } from "./VectorsVO";

class MinimapPlayerVO extends AbstractVO {
  static readonly PLAYER_MOVING_NORTH: number = 1;
  static readonly PLAYER_MOVING_SOUTH: number = 2;
  static readonly PLAYER_MOVING_EAST: number = 3;
  static readonly PLAYER_MOVING_WEST: number = 4;

  private _dir: number;
  private _isMoving: boolean;
  private _vector: VectorVO;
  private _key: string;
  private _forwardDir: number;
  private _backwardDir: number;

  public get dir(): number {
    return this._dir;
  }

  public set dir(value: number) {
    this._dir = value;
  }

  public get isMoving(): boolean {
    return this._isMoving;
  }

  public set isMoving(value: boolean) {
    this._isMoving = value;
  }

	public get vector(): VectorVO {
		return this._vector;
	}

	public set vector(value: VectorVO) {
		this._vector = value;
	}

	public get key(): string {
		return this._key;
	}

	public set key(value: string) {
		this._key = value;
	}

	public get forwardDir(): number {
		return this._forwardDir;
	}

	public set forwardDir(value: number) {
		this._forwardDir = value;
	}

	public get backwardDir(): number {
		return this._backwardDir;
	}

	public set backwardDir(value: number) {
		this._backwardDir = value;
	}

  constructor() {
    super();
  }
}

export { MinimapPlayerVO };
