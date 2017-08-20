import { EnhancementVO } from "./EnhancementsVO";

class AttributeVO {
  private _uid: number;
  private _strength: number;
  private _agility: number;
  private _alacrity: number;
  private _concentration: number;
  private _hacking: number;
  private _enchancements: Array<EnhancementVO>;

  constructor(data: AttributeVO | {} = {}) {
    Object.assign(this, data);
  }
}

export { AttributeVO };