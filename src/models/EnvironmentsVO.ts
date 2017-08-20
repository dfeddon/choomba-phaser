class EnvironmentVO {
  private _uid: number;
  private _name: string;
  private _type: number;

  constructor(data: EnvironmentVO | {} = {}) {
    Object.assign(this, data);
  }
}

export { EnvironmentVO };