import { CharacterCombatTargetVO } from "./CharacterCombatTargetsVO";
import { CharacterCombatConditionVO } from "./CharacterCombatConditionsVO";
import { AbstractVO } from "./AbstractVO";

class CharacterCombatVO extends AbstractVO {
  private _isActive: boolean;
  private _isSource: boolean;
  private _abilityType: number;
  private _target: CharacterCombatTargetVO[];
  private _conditions: CharacterCombatConditionVO[];

  constructor(isSource?: boolean, abilityType?:number, target?:number[]) {
    super();
    // Object.assign(this, data);
    this._isSource = isSource;
    this._abilityType = abilityType;
  }
}

export { CharacterCombatVO };
