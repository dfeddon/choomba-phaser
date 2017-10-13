import { AbstractVO } from "./AbstractVO";

class EnvironmentVO extends AbstractVO {
  // private _uid: number;
  private _name: string;
  private _type: number;

  constructor(data: EnvironmentVO | {} = {}) {
    super();
    Object.assign(this, data);
  }
}

export { EnvironmentVO };