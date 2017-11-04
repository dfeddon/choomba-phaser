import { AbstractVO } from "./AbstractVO";

class CharacterDataVO extends AbstractVO {
  private _key: string;
  private _name: string;

	public get key(): string {
		return this._key;
	}

	public set key(value: string) {
		this._key = value;
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}

  constructor(key: string, name?: string) {
		super();
	// Object.assign(this, data);
	this._key = key;
	if (name)
		this._name = name;
  }
}

export { CharacterDataVO };