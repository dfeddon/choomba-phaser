import { EnhancementVO } from "./EnhancementsVO";
import { AbstractVO } from "./AbstractVO";

class AttributeVO extends AbstractVO {
  // private _uid: number;
  private _strength: number;
  private _agility: number;
  private _alacrity: number;
  private _concentration: number;
  private _hacking: number;
  private _enchancements: Array<EnhancementVO>;

  constructor(data: AttributeVO | {} = {}) {
    super();
    Object.assign(this, data);
  }
}

export { AttributeVO };