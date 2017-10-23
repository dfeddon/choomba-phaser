import { AbstractVO } from "./AbstractVO";

class MinimapPlayerVO extends AbstractVO {
  static readonly PLAYER_MOVING_NORTH: number = 1;
  static readonly PLAYER_MOVING_SOUTH: number = 2;
  static readonly PLAYER_MOVING_EAST: number = 3;
  static readonly PLAYER_MOVING_WEST: number = 4;

  private _dir: number;
  private _isMoving: boolean;

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

  constructor() {
    super();
  }
}

export { MinimapPlayerVO };
