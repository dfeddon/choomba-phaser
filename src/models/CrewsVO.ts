import { AbstractVO } from "./AbstractVO";
import { CharacterVO } from "./CharactersVO";

class CrewVO extends AbstractVO {
	private _characters: CharacterVO[];

	public get characters(): CharacterVO[] {
		return this._characters;
	}

	public set characters(value: CharacterVO[]) {
		this._characters = value;
	}
	
  constructor() {
    super();
  }
}

export { CrewVO };
