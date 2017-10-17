import { AbstractVO } from "./AbstractVO";
import { EntityVO } from "./EntitiesVO";


class AllianceVO extends AbstractVO {
  public static readonly RANK_INITITATE: number = 0;
  public static readonly RANK_PLEDGE: number = 1;
  public static readonly RANK_RUNNER: number = 2;

  private _entity: EntityVO;
  private _rank: number;

  constructor() {
    super();
  }
}

export { AllianceVO };
