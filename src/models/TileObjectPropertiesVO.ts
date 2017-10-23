import { AbstractVO } from "./AbstractVO";

class TilemapObjectPropertyVO extends AbstractVO {
  private _backward: number;
  private _forward: number;

  public get backward(): number {
    return this._backward;
  }

  public set backward(value: number) {
    this._backward = value;
  }

  public get forward(): number {
    return this._forward;
  }

  public set forward(value: number) {
    this._forward = value;
  }

  constructor(data: TilemapObjectPropertyVO | {} = {}) {
    super();
    Object.assign(this, data);
  }
}

export { TilemapObjectPropertyVO };
