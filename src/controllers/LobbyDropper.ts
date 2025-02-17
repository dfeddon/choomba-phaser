import { Globals } from "../services/Globals";
import { CharacterVO } from "../models/CharactersVO";

class LobbyDropper {
	public static readonly POOL_CLASS_NAME: string = "pool-item-img";
	public static readonly CREW_CLASS_NAME: string = "crew-portraits";

	public static readonly CHARACTER_ID_ATTRIBUTE: string = "charid";

	static dropped = function(src: any, targ: any): void {
		console.log("* static dropped", src, targ);
		// _this.charDragTarget = e.target as any;
		// _this.charDragTarget = i;//.id;
		console.log("ondrop event", targ.id);
		console.log("* dropping", src, "onto", targ);
		// e.stopImmediatePropagation();

		// store attributes
		let targClass: string = targ.getAttribute('class');
		let targId: number = parseInt(targ.getAttribute(LobbyDropper.CHARACTER_ID_ATTRIBUTE));
		let targSrc: string = targ.getAttribute('src');
		let targPosition: number = parseInt(targ.getAttribute('position'));
		let targVO: CharacterVO = (targId) ? Globals.getInstance().player.entity.getCharacterFromPoolById(targId) : null;

		let srcClass: string = src.getAttribute('class');
		let srcId: number = parseInt(src.getAttribute(LobbyDropper.CHARACTER_ID_ATTRIBUTE));
		let srcSrc: string = src.getAttribute('src');
		let srcPosition: number = parseInt(src.getAttribute("position"));
		let srcVO: CharacterVO = (srcId) ? Globals.getInstance().player.entity.getCharacterFromPoolById(srcId) : null;

		// first, ensure drag source class is *TARGET_CLASS_NAME* and drop targ class is *SOURCE_CLASS_NAME*
		// TODO: player *could* drag from portraits back to pool...
		// console.log("*=", srcClass, targClass);

		// disallow pool-to-pool move
		if (targClass === LobbyDropper.POOL_CLASS_NAME && srcClass === LobbyDropper.POOL_CLASS_NAME) {
			return console.log("* pool-to-pool movement not allowed...");
		}
		// no move made
		if (targ === src)
			return console.log("move self-canceled...");
		// crew-to-crew
		if (targClass === LobbyDropper.CREW_CLASS_NAME && srcClass === LobbyDropper.CREW_CLASS_NAME) {
			console.log("* switching positions...", srcPosition, targPosition);
			
			// switch character positions (auto-save)
			(srcVO as CharacterVO).position = targPosition;
			(targVO as CharacterVO).position = srcPosition;

			// switch image slots
			src.setAttribute('src', targSrc);
			src.setAttribute(LobbyDropper.CHARACTER_ID_ATTRIBUTE, targId);
			targ.setAttribute('src', srcSrc);
			targ.setAttribute(LobbyDropper.CHARACTER_ID_ATTRIBUTE, srcId);

			// switch handle labels
			let srcLabel: HTMLElement = document.getElementById('crew-name-' + srcPosition.toString()) as HTMLElement;
			srcLabel.innerText = targVO.handle;
			let targLabel: HTMLElement = document.getElementById('crew-name-' + targPosition.toString()) as HTMLElement;
			targLabel.innerText = srcVO.handle;

			return;
		}

		// from POOL to CREW
		// if target is empty, add source and refresh pool
		if (!targSrc) {
			console.log("* target has no image, set it!");
			targ.setAttribute('src', srcSrc);
			targ.setAttribute(LobbyDropper.CHARACTER_ID_ATTRIBUTE, srcId);
			// change char vo position attribute to slot num
			srcVO.position = targPosition;
			// var srcVO: CharacterVO = Globals.getInstance().player.entity.getCharacterFromPoolById(srcId);
			console.log("* char source", srcVO);
			console.log("* target position", targPosition);
			// refresh pool
		} else { // otherwise, switch target and source
			console.log("* target has image, switch!");
			// first, let's determine which element is crew... (pool excludes label and position = 0)
			if (targClass === LobbyDropper.CREW_CLASS_NAME) {
				targ.setAttribute('src', srcSrc);
				targ.setAttribute(LobbyDropper.CHARACTER_ID_ATTRIBUTE, srcId);
				let targLabel: HTMLElement = document.getElementById('crew-name-' + targPosition.toString()) as HTMLElement;
				targLabel.innerText = srcVO.handle;
				// change char vo position attribute to slot num
				srcVO.position = targPosition;

				console.log("* targ/src", typeof(srcVO), srcVO);

				// src is pool
				src.setAttribute('src', targSrc);
				src.setAttribute(LobbyDropper.CHARACTER_ID_ATTRIBUTE, targId);
				// change char vo position attribute to slot num
				targVO.position = 0;//srcPosition;
			}
			else {
				src.setAttribute('src', targSrc);
				src.setAttribute(LobbyDropper.CHARACTER_ID_ATTRIBUTE, targId);
				let srcLabel: HTMLElement = document.getElementById('crew-name-' + srcPosition.toString()) as HTMLElement;
				srcLabel.innerText = targVO.handle;
				// change char vo position attribute to slot num
				targVO.position = srcPosition;

				// targ is pool
				targ.setAttribute('src', srcSrc);
				targ.setAttribute(LobbyDropper.CHARACTER_ID_ATTRIBUTE, srcId);
				// change char vo position attribute to slot num
				srcVO.position = 0;//srcPosition;
			}
			// exchange chars vo position attributes
			// update label on crew slot
			// refresh/sort pool array
		}
	}
}

export { LobbyDropper }