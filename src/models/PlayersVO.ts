import { EntityVO } from './EntitiesVO';
import { CharacterVO } from "./CharactersVO";
import { StructureVO } from "./StructuresVO";
import { AbstractVO } from "./AbstractVO";
import { AllianceVO } from './AlliancesVO';

/** Entity class.
 * @class
 */
class PlayerVO extends AbstractVO {
  
  public static readonly MEMBERSHIP_TIER_FREEMIUM: number = 1;
  public static readonly MEMBERSHIP_TIER_ADFREE: number = 2;

  private _name: string;
  private _membership: number = PlayerVO.MEMBERSHIP_TIER_FREEMIUM;
  private _entity: EntityVO[];
  // private _receipts: ReceiptsVO[];

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

	public get membership(): number  {
		return this._membership;
	}

	public set membership(value: number ) {
		this._membership = value;
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
