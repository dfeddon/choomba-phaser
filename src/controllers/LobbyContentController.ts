// import { CrewContentController } from "./CrewContentController"
import { Globals } from "../services/Globals";

class LobbyContentController {

	// private container = document.getElementById("content-wrapper");
	private currentView: HTMLElement;
	private content: any;
	private currentId: string;

	private globals: Globals = Globals.getInstance();

	addContent(id: string) : void {
		console.log("== addContent ==", id);

		var container = document.getElementById("content-wrapper");

		switch(this.currentId) {
			case "tabCrew":
				container.removeEventListener("click", this.globals.crewController.clickHandler);
			break;
		}

		this.currentId = id;

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
				container.addEventListener("click", this.globals.crewController.clickHandler);
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
		container.appendChild(clone);

		if (this.currentView)
			container.removeChild(this.currentView);
		
			this.currentView = clone;
	}

	// crewLoadedHandler() {
	// 	console.log("== LobbyContentController.crewLoadedHandler ==");
		
	// 	CrewContentController.create(this.content.import.body);
	// }

}
export { LobbyContentController }