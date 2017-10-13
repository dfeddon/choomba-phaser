class AbstractVO {
  private _uid: number;

  public get uid(): number {
    return this._uid;
  }

//   public set uid(value: number) {
//     this._uid = value;
//   }
  constructor() {
	// set uid
	this._uid = new Date().valueOf() + ((Math.floor(Math.random() * 4000)) + 1000);
	console.log("* uid", this.uid);
  }

}

export { AbstractVO };
