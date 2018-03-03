// interface ICrewContentController {
// 	crewInfoModal: any;
// }
// import '../public/css/index.scss';

import { Globals } from "../services/Globals";
import { LobbyDropper } from "../controllers/LobbyDropper";
import { CharacterVO } from "../models/CharactersVO";
// import { ICrewContentController } from "../interfaces/ICrewContentController";

class CrewContentController {
    // item: HTMLImageElement;
	// name: HTMLElement;
	// slot: number = 1;

	__this = this;

	clickHandler(e: any): void {
		console.log('== CrewContentController ==', e);
		switch(e.target.className) {
			case 'pool-item-img':
			case 'crew-portraits':
				Globals.getInstance().crewController.crewInfoModal(e);
			break;
		}
	}

	crewInfoModal(e: any): void {
		// show character modal window
		console.log("* item clicked!", e);
		var selectedId: number = parseInt((e.srcElement.attributes as any).charid.nodeValue);
		console.log("* charid", (e.srcElement.attributes as any).charid.nodeValue);
		var modal: HTMLDivElement = document.getElementById('charModal') as HTMLDivElement;
		var span: HTMLSpanElement = document.getElementsByClassName("close")[0] as HTMLSpanElement;

		// open modal
		modal.style.display = "block";

		// get character
		var vo: CharacterVO;
		var chars: CharacterVO[] = Globals.getInstance().player.entity.characterPool;
		for (let char of chars) {
			console.log("* char id", char.id, selectedId);
			if (char.id === selectedId) {
				console.log("* found char", char);
				vo = char;
				break;
			}
		}
		// populate modal data
		document.getElementById('cmodHandle').innerText = vo.handle.toUpperCase();
		document.getElementById('cmodRole').innerText = vo.getLabelByRole();
		var profile = document.getElementById('cmodProfile') as HTMLImageElement;
		profile.src = 'http://s3.amazonaws.com/com.dfeddon.choomba/client/images/portraits/portrait_' + vo.role.toString() + '.png';
		profile.width = 75;
		profile.height = 100;
		// When the user clicks on <span> (x), close the modal
		span.onclick = function () {
			modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
	}

	createView(doc: any) {
		console.log("== CreaContentController.create ==", doc);
		
		let slot: number = 1;

		for(let i: number = 0; i < Globals.getInstance().player.entity.characterPool.length; i++) {
			console.log("* character type:", Globals.getInstance().player.entity.characterPool[i].role);
			let item: HTMLImageElement;
			let name: HTMLElement;
			// populate character pool (position => 0)
			if (Globals.getInstance().player.entity.characterPool[i].position === 0) {
				item = doc.querySelector('#item-' + slot.toString() + '-img') as HTMLImageElement;
				if (item) {
					console.log("* item", i, slot, item);
					item.setAttribute(LobbyDropper.CHARACTER_ID_ATTRIBUTE, Globals.getInstance().player.entity.characterPool[i].id.toString());
					item.src = 'http://s3.amazonaws.com/com.dfeddon.choomba/client/images/portraits/portrait_' + Globals.getInstance().player.entity.characterPool[i].role.toString() + '.png';
					item.width = 75;
					item.height = 100;
					slot++;

					// click handler
					item.addEventListener("click", function (e) {
						// show character modal window
						console.log("* item clicked!", e);
						var selectedId: number = parseInt((e.srcElement.attributes as any).charid.nodeValue);
						console.log("* charid", (e.srcElement.attributes as any).charid.nodeValue);
						var modal: HTMLDivElement = doc.querySelector('#charModal') as HTMLDivElement;
						var span: HTMLSpanElement = doc.querySelector(".close")[0] as HTMLSpanElement;

						// open modal
						modal.style.display = "block";

						// get character
						var vo: CharacterVO;
						var chars: CharacterVO[] = Globals.getInstance().player.entity.characterPool;
						for (let char of chars) {
							console.log("* char id", char.id, selectedId);
							if (char.id === selectedId) {
								console.log("* found char", char);
								vo = char;
								break;
							}
						}
						// populate modal data
						doc.querySelector('#cmodHandle').innerText = vo.handle.toUpperCase();
						doc.querySelector('#cmodRole').innerText = vo.getLabelByRole();
						var profile = doc.querySelector('#cmodProfile') as HTMLImageElement;
						profile.src = 'http://s3.amazonaws.com/com.dfeddon.choomba/client/images/portraits/portrait_' + vo.role.toString() + '.png';
						profile.width = 75;
						profile.height = 100;
						// When the user clicks on <span> (x), close the modal
						span.onclick = function () {
							modal.style.display = "none";
						}

						// When the user clicks anywhere outside of the modal, close it
						// window.onclick = function (event) {
						// 	if (event.target == modal) {
						// 		modal.style.display = "none";
						// 	}
						// }
					}); // end click evt
				} // end if item
			} // end if Globals
		} // end for
		return this;
	} // end create fnc
} // end class

export { CrewContentController }