import { AbstractVO } from "./AbstractVO";

class CharacterCombatTargetVO extends AbstractVO {
  private _abilityType: number;
  private _abilityValue: number;

  constructor(abilityType: number, abilityValue: number) {
    super();
    this._abilityType = abilityType;
    this._abilityValue = abilityValue;
  }
}

export { CharacterCombatTargetVO };
