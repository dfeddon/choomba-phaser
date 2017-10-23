import { AbstractVO } from "./AbstractVO";
import { TilemapObjectPropertyVO } from "./TileObjectPropertiesVO";

class TilemapObjectVO extends AbstractVO {
  private _name: string;
  private _type: string;
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;
  private _properties: TilemapObjectPropertyVO;
  private _rectangle: boolean;
  private _rotation: number;
  private _visible: boolean;

	public get x(): number {
		return this._x;
	}

	public set x(value: number) {
		this._x = value;
	}

	public get y(): number {
		return this._y;
	}

	public set y(value: number) {
		this._y = value;
	}

	public get properties(): TilemapObjectPropertyVO {
		return this._properties;
	}

	public set properties(value: TilemapObjectPropertyVO) {
		this._properties = value;
	}

  constructor(data: TilemapObjectVO | {} = {}) {
    super();
    Object.assign(this, data);
  }
}

export { TilemapObjectVO };
