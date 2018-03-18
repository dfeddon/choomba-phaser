import { NumberHelper } from "../helpers/NumberHelper";

// import { AWSService } from "../services/AWSService"; 

// import { CharactersSchema } from "../services/Schemas/CharactersSchema";

abstract class AbstractVO extends Object {
  // public static readonly SCHEMA_TYPE_CHARACTER:number = 1;

  // protected AWSService = AWSService;//.getInstance();
  private _uid: number;
  private _createdAt: object;
  private _updatedAt: object;

  protected _initializing: boolean = true;

  constructor(generateId?: boolean) {
    super();
    // set uid
    console.log("* abstractvo", generateId);
    if (generateId !== false)
      this._uid = NumberHelper.UIDGenerator();// new object().valueOf() + ((Math.floor(Math.random() * 4000)) + 1000);
    // console.log("* uid", this.uid);
  }

  fromDatabase(obj: object, instance: object): object {
    // get properties
    let p: any[] = Object.getOwnPropertyNames(obj);

    // assign to object
    p.forEach(element => {
      console.log('=>', element, obj[element], typeof(obj[element]), typeof(instance[element]));

      // if data is number and instance is object, potential subclass id
      if (typeof(obj[element]) === "number" && typeof(instance[element]) === "object") {
        // we might have the id for an subclass member
        console.log("***************");//, instance[element]);
        if (instance[element].id) {
          console.log("* change generated id from", instance[element].id, 'to database id', obj[element]);
          instance[element].id = obj[element];
        } else if (instance[element].id) {
          console.log("* removing generated id from subclass", instance[element].id);
          instance[element].id === null;
        }
      } else if (typeof(obj[element]) === "object" && (element === 'createdAt' || element === 'updatedAt')) {
        instance[element] = obj[element];
      } 
      else if (obj[element] !== Object(obj[element])) {
        instance[element] = obj[element];
      }
      else if (obj[element] instanceof Array) {
        instance[element] = obj[element];
      }
    });
    return instance;
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

  // update db of single property
  protected update = (service: any, schema: any, property: string): any => {
    console.log("-- saving", schema, property);

    // create db-friendly object
    let key: object = { id: this.uid };
    let prop: object = {};

    // set property
    prop[property] = this[property];
    console.log('auto-updating -->', key, prop);

    // send to db
    service.update(schema, key, 1, prop, function (err: any, item: any) {
      if (err) console.log(err);
      else console.log(item);
    });
  }

  // getters & setters
  public get uid(): number {
    return this._uid;
  }

  public set id(value: number) {
    this._uid = value;
  }
  public get id(): number {
    return this._uid;
  }

  public get createdAt(): object {
    return this._createdAt;
  }

  public set createdAt(value: object) {
    this._createdAt = value;
  }

  public get updatedAt(): object {
    return this._updatedAt;
  }

  public set updatedAt(value: object) {
    this._updatedAt = value;
  }

}

export { AbstractVO };
