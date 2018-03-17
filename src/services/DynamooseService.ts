import { IncidentsSchema } from "./Schemas/IncidentsSchema";
import { CharactersSchema } from "./Schemas/CharactersSchema";
import { EntityVO } from "../models/EntitiesVO";
import { CharacterVO } from "../models/CharactersVO";
import { EntitiesSchema } from "./Schemas/EntitiesSchema";
import { NumberHelper } from "../helpers/NumberHelper";

// import AWS = require('aws-sdk');
// import * as AWS from "aws-sdk";
// import * as S3 from "aws-sdk/clients/s3";
// import * as AWS from "aws-sdk/clients/DynamoDB";
var dynamoose = require("dynamoose");

class DynamooseService {
  public static readonly UPDATE_TYPE_PUT: number = 1;
  public static readonly UPDATE_TYPE_ADD: number = 2;
  public static readonly UPDATE_TYPE_DELETE: number = 3;

  public static readonly DYNAMODB_TABLE_INCIDENTS: string = "PNK_incidents";
  public static readonly DYNAMODB_TABLE_ENTITIES: string = "PNK_entities";
  public static readonly DYNAMODB_TABLE_PLAYERS: string = "PNK_players";
  public static readonly DYNAMODB_TABLE_CHARACTERS: string = "PNK_characters";
  public static readonly DYNAMODB_TABLE_SECTORS: string = "PNK_sectors";
  public static readonly DYNAMODB_TABLE_SECTOR_DISTRICTS: string = "PNK_sectordistricts";
  public static readonly DYNAMODB_TABLE_SECTOR_BLOCKS: string = "PNK_sectorblocks";


  entity: EntityVO;

  constructor() {
    // super();
    // var dynamoose = require('dynamoose');
    dynamoose.AWS.config.update({
      accessKeyId: "AKIAIH2FBIAF5JYWFJFA",
      secretAccessKey: "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",
      region: "us-east-1"
    });

    // TODO: set auto-create to 'false' for production
    dynamoose.setDefaults({ create: true });
  }

  // setGame(game: Phaser.Game): void {
  //   if (game) {
  //     this.game = game;
  //     console.log("* game",this.game);
  //   }
  // }

  // UIDGenerator(): number {
  //   var rnd = Math.floor(Math.random() * 10000 + 10000);
  //   var d: number = Date.now();
  //   var uid: number = parseInt(d + "" + rnd);
  //   // var uid: number = parseInt(d) + rnd;//parseInt(Date.now() + "" + rnd);
  //   console.log("* uidGen", uid, typeof(uid), d);

  //   return uid;
  // }
  /*
	app.route('/api/brands')
		.post(controller.create(Model))
		.get(controller.findAll(Model))
	;

	app.route('/api/brands/:id')
		.get(controller.findById(Model))
		.put(controller.update(Model))
		.delete(controller.delete(Model))
	*/

  init(): void {
    console.log("%c== DynamooseService.init() ==", "color:lime");
    // test findbyid
    /*
    this.findById(new IncidentsSchema(), 151092953629915800, function(err: any, item: any) {
		if (err) console.log(err);
		else console.log(item);
	});//*/
    // test create
    /*var obj = {id: this.UIDGenerator(), name: "Hi's Incident"};
	this.create(new IncidentsSchema(), obj, function(err: any, item: any) {
		if (err) console.log(err);
		else console.log(item);
  });*/
    /*
    var obj = { id: NumberHelper.UIDGenerator(), name: "Sipher 3", characters: [] };
    this.create(new EntitiesSchema(), obj, function (err: any, item: any) {
      if (err) console.log(err);
      else console.log(item);
    });//*/
    // test update / schema: any, obj: any, type: number, updateObj: object, callback: any
    /*
    this.update(new IncidentsSchema(), { id: 151146715597812300}, 1, {name: "So Far"}, function(err: any, item: any) {
		if (err) console.log(err);
		else console.log(item);
  });//*/
    /*
    this.update(new EntitiesSchema(), { id: 151294528270316640 }, DynamooseService.UPDATE_TYPE_PUT, { characters: [151283850906113280, 151283726975615900]}, function(err: any, item: any){
      if (err) console.log(err);
      else console.log(item);
	  });//*/
    // test delete
    /*this.delete(new IncidentsSchema(), {id: 151092958913916260}, function(err: any) {
		if (err) console.log(err);
		else console.log("%c## deleted", "color:lime");
	});*/

    /*
    var schema = new IncidentsSchema();
    var incident = new schema.model({
      id: this.UIDGenerator(),
      name: "New Infiltration",
      description: "Infiltration Description...",
      type: 1,
      structure: 1,
      entity: 1
    });

    // Save to DynamoDB
    incident.save(function(err: any) {
      if (err) return console.error(err);
      console.log("## save success!");
    });

    // Lookup in DynamoDB
    schema.model.get(151092953629915800).then(function(item: any) {
      console.log("%c## Got incident - " + JSON.stringify(item), "color:lime");
	});
	*/
  }

  ///////////////////////////////
  // create
  ///////////////////////////////
  create(schema: any, obj: any, callback: any): any {
    schema.model.create(obj, function(err: any, item: any) {
      if (err) return callback(err, null); //console.error(err);
      console.log("%c## dynamoose created", "color:lime");
      return callback(null, item);
    });
  }
  ///////////////////////////////
  // findall
  ///////////////////////////////
  // findAll(schema: any, options?: any) {
  // 	schema.model.get()
  // }

  ///////////////////////////////
  // findById #id
  ///////////////////////////////
  findById(schema: any, key: number, callback: any, options?: any): any {
    console.log("%c## findById " + key, "color:lime");
    schema.model.get({ id: key }, function(err: any, item: any) {
      // console.log(item, err);
      if (err) return callback(err, null);
      console.log("%c## found " + JSON.stringify(item), "color:lime");
      return callback(null, item);
    });
  }

  ///////////////////////////////
  // update #id
  ///////////////////////////////
  update(schema: any, key: any, type: number, updateObj: object, callback: any) {
  console.log(key);
  console.log(type);
  console.log(updateObj);
	var typeObj = {};

    switch (type) {
      case DynamooseService.UPDATE_TYPE_PUT:
        typeObj = { $PUT: updateObj };
        break;
      case DynamooseService.UPDATE_TYPE_ADD:
        typeObj = { $ADD: updateObj };
        break;
      case DynamooseService.UPDATE_TYPE_DELETE:
        typeObj = { $DELETE: updateObj };
		    break;
      default: typeObj = { $PUT: updateObj };
      break;
    }
    console.log(JSON.stringify(key), JSON.stringify(typeObj));
    schema.model.update(key, typeObj, function(err: any) {
      if (err) return console.error(err);
      console.log("%c## save success", "color:lime");
    });
  }
  ///////////////////////////////
  // delete #id
  ///////////////////////////////
  delete(schema: any, key: any, callback: any, options?: any): any {
    schema.model.delete(key, options, function(err: any) {
      if (err) return callback(err);
      console.log("%c## deleted", "color:lime");
      return callback(null);
    });
  }

  getAllByArray(schema: any, ids: number[], callback: any): any {
    // console.log("* Dynamoose.getAllByArray");
    let pool: object[] = [];
    for (let id of ids) {
      // console.log("+ id", id);
      this.findById(schema, id, function (err: any, result: any) {
        if (err) return callback(err);
        // console.log("* got ids", result);
        pool.push(result);
        console.log(pool.length, ids.length);
        if (pool.length === ids.length) {
          // console.log("* done!", pool);
          return callback(null, pool)
        }
      });
    }
  }

  batchCreate(schema: any, items: object[], callback: any, options?: object) {
    // console.log("* batchPut", items);
    schema.model.batchPut(items, options, function(err: any, result: any) {
      if (err)
        console.log(JSON.stringify(err));
      if (err) return callback(err, null);
      else return callback(null, result);
    });
  }

  ///////////////////////////////
  // findById #id
  ///////////////////////////////
  getAll(schema: any, callback: any): any {
    console.log("* Dynamoose.getAll");
    schema.model.scan().exec(function (err: any, result: any) {
      // console.log(item, err);
      if (err) return callback(err, null);
      console.log("%c## found " + JSON.stringify(result), "color:lime");
      return callback(null, result);
    });
  }
  ///////////////////////////////
  // get characters by array
  ///////////////////////////////
  getCharactersByArray(chars: number[], callback: any): any {
    console.log("== getCharactersByArray ==", chars);
    // confirm global has characters array
    // if (!this.game.global) {
    //   this.game.global = {};
    //   this.game.global.characters = [];
    // }
    let pool: CharacterVO[] = [];
    for (let char of chars) {
      console.log("+ char", char);
      this.findById(new CharactersSchema(), char, function(err: any, result: any) {
        console.log("* got char", result);
        pool.push(new CharacterVO(result));
        console.log(pool.length, chars.length);
        if (pool.length === chars.length) {
          console.log("* done!");
          return callback(pool)
        }
      });
    }
  };

  createCharacter(role?: number, total?: number) {
    if (!total)
      total = 1;
    var vo: CharacterVO;
    for (var i = 0; i < total; i++) {
      vo = new CharacterVO();
      vo.createCharacter();
      // this.create(new CharactersSchema(), {class: role}, this.createCharacterHandler);
    }
    return vo;
  }

  createCharacterHandler(err: any, result: any) {
    console.log("+ character created", err, result);
    // get id
    // create values from charactersvo
  }

}

export { DynamooseService };