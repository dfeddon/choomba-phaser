import { AbstractVO } from "./AbstractVO";

class ObjectVO extends AbstractVO {

  public static readonly OBJECT_TYPE_CONDITION: number = 1; // buff/debuff
  public static readonly OBJECT_TYPE_EQUIPMENT: number = 2; // character equipment
  public static readonly OBJECT_TYPE_PROVISION: number = 3; // consumables

  private _type: number;
  private _value: number;

  constructor() {
    super();
  }
}

export { ObjectVO };