// import { CrewContentController } from "./CrewContentController"
import { Globals } from "../services/Globals";

class LobbyContentController {

	private container = document.getElementById("crew-column");
	private currentView: HTMLElement;
	private content: any;

	private globals: Globals = Globals.getInstance();

	addContent(id: string) : void {
		console.log("== addContent ==", id);

		let clone: HTMLElement;
		
		switch (id) {
			case "tabPulse":
				this.content = document.querySelector('#section-pulse');
				clone = document.importNode(this.content.import.body, true);
				break;
			case "tabCrew":
				this.content = document.querySelector('#section-crew');
				clone = document.importNode(this.content.import.body, true);
				this.globals.crewController = this.globals.crewController.createView(this.content.import.body);
				this.container.addEventListener("click", this.globals.crewController.clickHandler);
				break;
			case "tabTerritory":
				this.content = document.querySelector('#section-territory');
				clone = document.importNode(this.content.import.body, true);
				break;
			case "tabBiz":
				this.content = document.querySelector('#section-biz');
				clone = document.importNode(this.content.import.body, true);
				break;
			case "tabDirectives":
				this.content = document.querySelector('#section-directives');
				clone = document.importNode(this.content.import.body, true);
				break;
			default: console.log("! Invalid case");
		}
		this.container = document.getElementById("crew-column");
		this.container.appendChild(clone);

		if (this.currentView)
			this.container.removeChild(this.currentView);
		
			this.currentView = clone;
	}

	// crewLoadedHandler() {
	// 	console.log("== LobbyContentController.crewLoadedHandler ==");
		
	// 	CrewContentController.create(this.content.import.body);
	// }

}
export { LobbyContentController }