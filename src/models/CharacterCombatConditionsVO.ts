import { AbstractVO } from "./AbstractVO";

class CharacterCombatConditionVO extends AbstractVO {
  private _conditionType: number;
  private _conditionValue: number;
  private _endsAtTurn: number;

  constructor(conditionType: number, conditionValue: number, endsAtTurn: number) {
    super();
    // Object.assign(this, data);
    this._conditionType = conditionType;
    this._conditionValue = conditionValue;
    this._endsAtTurn = endsAtTurn;
  }
}

export { CharacterCombatConditionVO };
