import NavigationState from "../states/NavigationState";
import CombatStageView from "../views/CombatStageView";
import CombatUIView from "../views/CombatUIView";

class NavigationController {
	// views
	viewState: NavigationState;
	viewStage: CombatStageView;
	viewUI: CombatUIView;

  constructor(vState: NavigationState, vStage: CombatStageView, vUI: CombatUIView) {
	console.log("== NavigationController.constructor ==");

	this.viewState = vState;
	this.viewStage = vStage;
	this.viewUI = vUI;
  }

  crewMove(dir: number) {
	  console.log("== crewMove ==", dir);
  }

}

export { NavigationController };
