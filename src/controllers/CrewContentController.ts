// interface ICrewContentController {
// 	crewInfoModal: any;
// }
// import '../public/css/index.scss';

import { Globals } from "../services/Globals";
import { LobbyDropper } from "../controllers/LobbyDropper";
import { CharacterVO } from "../models/CharactersVO";
import { FlexGrid } from "phaser-ce";
// import { ICrewContentController } from "../interfaces/ICrewContentController";

class CrewContentController {
    // item: HTMLImageElement;
	// name: HTMLElement;
	// slot: number = 1;

	__this = this;

	clickHandler(e: any): void {
		// this => element clicked
		console.log('== CrewContentController ==', e);
		switch(e.target.className) {
			case 'pool-item-img':
			case 'crew-portraits':
				Globals.getInstance().crewController.crewInfoModal(e);
			break;
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
						var modal: HTMLDivElement = doc.querySelector('#character-view-modal') as HTMLDivElement;
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
						doc.querySelector('#character-view-profile-handle').innerText = vo.handle.toUpperCase();
						doc.querySelector('#character-view-profile-role').innerText = vo.getLabelByRole();
						var profile = doc.querySelector('#character-view-profile-portrait') as HTMLImageElement;
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

	crewInfoModal(e: any): void {
		// show character modal window
		console.log("* item clicked!", e);

		// empty?
		if (!e.srcElement.getAttribute(LobbyDropper.CHARACTER_ID_ATTRIBUTE)) {
			console.log("empty!");
			this.lockedSlotHandler(e);
			return;
		}
		var selectedId: number = parseInt((e.srcElement.attributes as any).charid.nodeValue);
		console.log("* charid", (e.srcElement.attributes as any).charid.nodeValue);
		var modal: HTMLDivElement = document.getElementById('character-view-modal') as HTMLDivElement;
		// var span: HTMLSpanElement = document.getElementsByClassName("close")[0] as HTMLSpanElement;
		var span: HTMLSpanElement = document.getElementById("close") as HTMLDivElement;
		var content: HTMLDivElement = document.getElementById("character-view-content") as HTMLDivElement;

		// open modal
		modal.style.display = "block";
		content.style.display = "flex";

		// get character
		var vo: CharacterVO;
		var chars: CharacterVO[] = Globals.getInstance().player.entity.characterPool;
		for (let char of chars) {
			// console.log("* char id", char.id, selectedId);
			if (char.id === selectedId) {
				console.log("* found char", char);
				vo = new CharacterVO(char);// as CharacterVO;
				break;
			}
		}
		console.log("* typeof", typeof(vo));
		
		// populate modal data
		document.getElementById('character-view-profile-handle').innerText = vo.handle.toUpperCase();
		document.getElementById('character-view-profile-role').innerText = vo.getLabelByRole().toLowerCase();
		var profile = document.getElementById('character-view-profile-portrait') as HTMLImageElement;
		profile.src = 'http://s3.amazonaws.com/com.dfeddon.choomba/client/images/portraits/portrait_' + vo.role.toString() + '.png';
		profile.width = 75;
		profile.height = 100;

		// attributes
		document.getElementById('character-view-attribute-cybermancy').innerText = vo.cybermancy.toString();
		document.getElementById('character-view-attribute-focus').innerText = vo.focus.toString();
		document.getElementById('character-view-attribute-grit').innerText = vo.grit.toString();
		document.getElementById('character-view-attribute-meat').innerText = vo.meat.toString();
		document.getElementById('character-view-attribute-reflexes').innerText = vo.reflexes.toString();

		// When the user clicks on <span> (x), close the modal
		span.onclick = function () {
			modal.style.display = "none";
			content.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		// window.onclick = function (event) {
		// 	if (event.target == modal) {
		// 		modal.style.display = "none";
		// 		content.style.display = "none";
		// 	}
		// }
	}

	lockedSlotHandler(e: MouseEvent) {
		console.log("* lockedSlotHandler", e);

		var modal: HTMLDivElement = document.getElementById('character-view-modal') as HTMLDivElement;
		var span: HTMLSpanElement = document.getElementsByClassName("close")[0] as HTMLSpanElement;
		var content = document.getElementById("locked-character-slot");

		// open modal
		modal.style.display = "block";
		content.style.display = "block";
		
		// When the user clicks on <span> (x), close the modal
		span.onclick = function () {
			console.log("* span onclick");
			
			modal.style.display = "none";
			content.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		// window.onclick = function (event) {
		// 	console.log("* window onclick", event.target);
			
		// 	if (event.target == modal) {
		// 		modal.style.display = "none";
		// 		content.style.display = "none";
		// 	}
		// }		
	}

} // end class

export { CrewContentController }