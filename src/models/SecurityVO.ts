import { AbstractVO } from "./AbstractVO";

class SecurityVO extends AbstractVO {

  public static readonly SECURITY_TYPE_SENSOR: number = 1; // alarm
  public static readonly SECURITY_TYPE_DRONE: number = 2; // defender
  public static readonly SECURITY_TYPE_DAMPENER: number = 3; // debuf/conditions

  private _type: number;
  private _charge: number = 0; // percentag?
  private _name: string;
  private _active: boolean = false;

  constructor() {
    super();
  }
}

export { SecurityVO };
