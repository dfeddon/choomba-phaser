class EnhancementVO {
  // enum ModifierType {Red, Green, Blue}

  private _uid: number;
  private _name: string;
  private _attribute: number;
  private _modifierType: number;
  private _modifierValue: number;
  private _charges: number;
  private _isActive: boolean;
  private _isDamaged: boolean;

  constructor(data: EnhancementVO | {} = {}) {
    Object.assign(this, data);
  }
}

export {EnhancementVO};