import { EntityVO } from './EntitiesVO';
import { CharacterVO } from "./CharactersVO";
import { StructureVO } from "./StructuresVO";
import { AbstractVO } from "./AbstractVO";
import { AllianceVO } from './AlliancesVO';

/** Entity class.
 * @class
 */
class PlayerVO extends AbstractVO {
  private _name: string;
  private _membership: number;
  private _alliances: AllianceVO[];
  // private _receipts: ReceiptsVO[];

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  /** Player constructor.
   * @constructor
   * @param {PlayerVO} data may optionally receive a PlayerVO.
   */
  constructor() {
    super();
    // Object.assign(this, data);
    // if (!this.id) {
    //   this.id = new Date().getTime().toString();
    // }
  }
}

export { PlayerVO };
