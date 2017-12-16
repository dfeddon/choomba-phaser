// import { AWSService } from "../services/AWSService"; 

// import { CharactersSchema } from "../services/Schemas/CharactersSchema";

class AbstractVO extends Object {
  // public static readonly SCHEMA_TYPE_CHARACTER:number = 1;

  // protected AWSService = AWSService;//.getInstance();
  private _uid: number;

  protected _initializing: boolean = true;

  constructor() {
    super();
    // set uid
    this._uid = new Date().valueOf() + ((Math.floor(Math.random() * 4000)) + 1000);
    // this.AWS = AWSService.getInstance();
    // console.log("* uid", this.uid);
  }

  protected update = function(service: any, schema:any, property: string): any {
    console.log("-- saving", schema, property);
    let key: object = {id:this.id};
    let prop:object = {};
    prop[property] = this[property];
    // this.dynamoose = new DynamooseService();
    // let AWS = AWSService.getInstance();
    console.log('-->', key, prop);
      // break;
    // }
    // this.update(new IncidentsSchema(), { id: 151146715597812300 }, 1, { name: "So Far" }, function (err: any, item: any) {
    //   if (err) console.log(err);
    //   else console.log(item);
    service.update(schema, key, 1, prop, function(err: any, item: any) {
      if (err) console.log(err);
      else console.log(item);
    });
  }

  public get uid(): number {
    return this._uid;
  }

}

export { AbstractVO };
