class VectorVO {

	// privates
	private _x: number;
	private _y: number;

	// getters & setters
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

	// constructor
  // constructor
  constructor(x: number, y: number) {
	if (x) this._x = x;
	if (y) this._y = y;
  }

}

export { VectorVO };
