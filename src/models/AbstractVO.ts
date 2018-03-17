import { NumberHelper } from "../helpers/NumberHelper";

// import { AWSService } from "../services/AWSService"; 

// import { CharactersSchema } from "../services/Schemas/CharactersSchema";

class AbstractVO extends Object {
  // public static readonly SCHEMA_TYPE_CHARACTER:number = 1;

  // protected AWSService = AWSService;//.getInstance();
  private _uid: number;
  private _createdAt: number;
  private _updatedAt: number;

  protected _initializing: boolean = true;

  constructor() {
    super();
    // set uid
    this._uid = NumberHelper.UIDGenerator();// new Date().valueOf() + ((Math.floor(Math.random() * 4000)) + 1000);
    // console.log("* uid", this.uid);
  }

  // update db of single property
  protected update = function(service: any, schema:any, property: string): any {
    console.log("-- saving", schema, property);

    // create db-friendly object
    let key: object = {id:this.id};
    let prop:object = {};

    // set property
    prop[property] = this[property];
    console.log('auto-updating -->', key, prop);

    // send to db
    service.update(schema, key, 1, prop, function(err: any, item: any) {
      if (err) console.log(err);
      else console.log(item);
    });
  }

  toDatabase(send: boolean = false): object {
    // create object and assign id
    let obj: Object = { id: this.uid };

    // get properties
    let p: any[] = Object.getOwnPropertyNames(this);

    // assign to object
    p.forEach(element => {
      // console.log('***', typeof (this[element]), element, this[element]);
      // only primitives
      if (this[element] !== Object(this[element])) {
        // ignore uid and initializing (id already assigned above)
        if (element !== "_uid" && element !== "_initializing")
          obj[element.substr(1)] = this[element];
      }
      // if object or array
      else if (typeof (this[element]) === 'object') {
        // if array, cull ids
        if (this[element] instanceof Array) {
          obj[element.substr(1)] = [];
          for (let item of this[element]) {
            obj[element.substr(1)].push(item.uid);
          }
        }
        // if sub-object, assign id if exists
        else if (this[element].uid) {
          obj[element.substr(1)] = this[element].uid;
        }
      }
    });
    // console.log("+ final obj", send, obj);

    if (send !== true)
      return obj;
    // save to db
    console.log("# sending to db...");
  }


  // getters & setters
  public get uid(): number {
    return this._uid;
  }

  public get createdAt(): number {
    return this._createdAt;
  }

  public set createdAt(value: number) {
    this._createdAt = value;
  }

  public get updatedAt(): number {
    return this._updatedAt;
  }

  public set updatedAt(value: number) {
    this._updatedAt = value;
  }

}

export { AbstractVO };
