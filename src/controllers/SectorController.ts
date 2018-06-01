import { SectorView } from "../views/SectorView";
import { SectorBlockVO } from "../models/SectorBlockVO";
import { SectorBlockService } from "../services/SectorBlockService";
import { Globals } from "../services/Globals";
import { SectorDistrictService } from "../services/SectorDistrictService";
import _ = require("lodash");
import { PointHelper } from "../helpers/PointHelper";
import { Point } from "phaser-ce";
import { SectorVO } from "../models/SectorVO";
import { SectorService } from "../services/SectorService";
import { SectorDistrictVO } from "../models/SectorDistrictVO";

class SectorController {
	
	game: Phaser.Game;
	state: Phaser.State;
	sectorView: SectorView;
	sectorVO: SectorVO;
	blocksKnown: SectorBlockVO[] = [];
	districtsKnown: SectorDistrictVO[] = [];
	totalBlocksX: number;
	totalBlocksY: number;

	constructor(game: Phaser.Game, state: Phaser.State) {
		console.log("== SectorController.constructor ==");
		this.game = game;
		this.state = state;
	}

	init() {
		// first, check cache
		// next, load known blocks
		this.getBlocks();
	}

	getBlocks() {
		// else, load blocks known
		let array: object[] = [];
		for (let blocks of Globals.getInstance().player.entity.blocksKnown)
			array.push({ id: blocks });
		console.log(Globals.getInstance().player.entity.blocksKnown);
		// console.log('* array', array);
		new SectorBlockService().batchGet(array, {}, (err: any, result: any) => {
			if (err) return console.log(err);
			else {
				// console.log("raw result", result);
				for (let block of result) {
					// console.log("* block", block);
					this.blocksKnown.push(new SectorBlockVO().fromDatabase(block) as SectorBlockVO);
				}
				console.log('* blocksKnown final', this.blocksKnown);
			}
			// get known district(s)
			let knownDistricts: number[] = [this.blocksKnown[0].district.id];
			for (let i = 0; i < this.blocksKnown.length; i++) {
				console.log(knownDistricts, this.blocksKnown[i].district.id);
				if (knownDistricts.indexOf(this.blocksKnown[i].district.id) === -1) {
					console.log("* adding new district id", this.blocksKnown[i].district.id);
					knownDistricts.push(this.blocksKnown[i].district.id);
				}
			}
			// get known district(s)
			this.getDistricts(knownDistricts);
		});
	}

	getDistricts(ids: number[]) {
		console.log("* getDistrictById", ids);
		if (ids.length === 1) {
			new SectorDistrictService().findById(ids[0], (err: any, result: any) => {
				if (err) return console.log(err);
				console.log('* got single district', result);
				this.districtsKnown.push(new SectorDistrictVO(result))
				// start view
				this.getSector(result.sector);
			});
		} else {
			new SectorDistrictService().batchGet(ids, {}, (err: any, result: any) => {
				if (err) return console.log(err);
				console.log("* got batch districts", result);
				for (let i = 0; i < result.length; i++)
					this.districtsKnown.push(new SectorDistrictVO(result[i]));
				this.getSector(result[0].sector);
			});
		}
	}

	getSector(id: number) {
		console.log("* getSector", id);
		new SectorService().findById(id, (err: any, result: any) => {
			if (err) return console.log(err);
			console.log('* got sector', result);
			this.getView();
		});
	}

	getView() {
		this.totalBlocksX = 13;
		this.totalBlocksY = 13;
		this.game.stage.width = this.totalBlocksX * 64;
		this.game.stage.height = this.totalBlocksY * 32;
		this.game.stage.backgroundColor = "#000";
		this.sectorView = new SectorView(this.game, 0, 0, "sectorView", this.totalBlocksX, this.totalBlocksY);
		this.sectorView.created(this.blocksKnown);
		// set bg color
		// this.game.stage.backgroundColor = "#4488AA";
		// size game canvas
		// this.game.scale.setGameSize(window.innerWidth, window.innerHeight);//h * 2);
		
		// set game bounds
		// let offset: number = (64 * 64) / 4;
		// this.game.world.setBounds(-offset, -offset, this.game.stage.width + offset, this.game.stage.height + offset);

		// this.game.world.setBounds(-offset, -offset, this.sectorView.gridGroup.width + (offset * 2), this.sectorView.gridGroup.height + (offset * 2));
		// this.game.clearBeforeRender = false; // this negates stage backgroundcolor
		// this.sectorView.gameScene.addEventListener("click", this.clickHandler);
		this.sectorView.gridGroup.onChildInputDown.add(this.clickHandler, this);
	}

	clickHandler(e: Phaser.Sprite, p: Phaser.Point) {
		console.log("* sector click handler", e, p);
		// console.log("* e", e.x, e.y);
		// console.log("* p", p.x - this.borderOffset.x, p.y);
		// let tile: Phaser.Point = PointHelper.getTileCoordinates(new Phaser.Point(p.x-this.borderOffset.x, p.y), 64);
		// console.log("* tile", tile.x, tile.y);
		// let padj: Phaser.Point = new Point(p.x)
		// let itc: Phaser.Point = PointHelper.isometricToCartesian(p);
		// console.log("iso to cart", itc.x, itc.y, this.borderOffset.x, this.borderOffset.y);
		// console.log("****", p.y + (p.x / 2), p.y - (p.x / 2))  // (-(1 / 2) * screen_x) + (1 * screen_y) + (0 * 1)
		console.log("===================");
		// let cart: Phaser.Point = PointHelper.isometricToCartesian(new Phaser.Point((p.x - this.borderOffset.x) - 64, p.y));
		let cart: Phaser.Point = PointHelper.iso2cart(p, this.sectorView.borderOffset, this.sectorView.tileWidth);
		console.log("==", cart.x, cart.y, this.sectorView.borderOffset.x, this.sectorView.borderOffset.y);
		let grid: Phaser.Point = PointHelper.getTileCoordinates(cart, 64);
		console.log("==", grid);

		// validate grid
		if (grid.x < 0 || grid.y < 0 || grid.x >= this.totalBlocksX || grid.y >= this.totalBlocksY)
			return console.log("! no tile (negative position)");

		console.log("== tile", this.sectorView.levelData[grid.y][grid.x]);
		let iso: Phaser.Point = PointHelper.cart2iso(grid, this.sectorView.borderOffset);
		console.log("++", iso);
		console.log("===================");
		let pt: Phaser.Point = PointHelper.cartesianToIsometric(p);//, this.gameScene, this.game.camera);
		let ptr: Point = new Point(0, 0);
		ptr.x = (p.x / 32 + p.y / 32) / 2;
		ptr.y = (p.y / 32 - (p.x / 64)) / 2;
		// console.log("local", this.gridGroup.toLocal(pt, this.gridGroup));
		//
		this.lockTheRenderer(false);
		let addressString = (grid.x + 1).toString() + this.sectorView.streetToText(grid.x + 1) + " street & " + (grid.y + 1).toString() + this.sectorView.streetToText(grid.y + 1) + " avenue";
		this.sectorView.getGroupChildByName(this.sectorView.uiGroup, "address", function (item: any) {
			item.setText(addressString);
		});
		let strucTypeString: string = this.sectorView.keyToString(this.sectorView.levelData[grid.y][grid.x].k as string);
		this.sectorView.getGroupChildByName(this.sectorView.uiGroup, "structure", function (item: any) {
			console.log("structType", item, strucTypeString);
			item.setText(strucTypeString);
		});
		let ownerString: string = "[Unclaimed Territory]";
		this.sectorView.getGroupChildByName(this.sectorView.uiGroup, "owner", function (item: any) {
			item.setText(ownerString);
		});

		this.sectorView.fov.alpha = 0;
		// this.emitterGroup.visible = false;
		// let offsetX: number = 0;//this.tileWidth / 2;
		// let offsetY: number = 0;//this.tileWidth / 2;
		// console.log("* rot", this.gridGroup.rotation);
		// var coord: any = this.pointFromAngle(e.centerX, e.centerY);
		// offsetY = Math.cos(this.gridGroup.rotation) * e.position.y;
		// e.loadTexture(this.b1Sprite.key);
		// this.game.camera.focusOnXY(p.x, p.y);
		// this.game.camera.lerp = new Phaser.Point(0.1, 0.1);
		// this.game.camera.view.centerOn(e.position.x, e.position.y);
		// ptr.x = 0; ptr.y = 0;
		// ptr.x += this.borderOffset.x;
		// ptr.y += this.borderOffset.y;
		// console.log("* rot", offsetY);//e.position.x * this.gridGroup.rotation, e.position.y * this.gridGroup.rotation);
		if (Globals.getInstance().isMobile === true) {
			this.sectorView.fov.x = iso.x;
			this.sectorView.fov.y = iso.y;
			this.lockTheRenderer(true);
		}
		else {
			this.game.add.tween(this.sectorView.fov).to({ x: iso.x, y: iso.y }, 500, Phaser.Easing.Quadratic.InOut, true);
			let t: Phaser.Tween = this.game.add.tween(this.sectorView.fov).to({ alpha: 1 }, 650, "Linear", true);
			t.onComplete.add(this.mapMoveCompleteHandler, this)
			// draw iso tile
			// tileType = this.levelData[i][j];
			// this.drawTileIso(tileType, i, j);
			// this.drawSingleTile(this.sectorView.levelData[0][0], grid.x, grid.y);
		}
	}

	drawSingleTile(tile: object, x: number, y: number): void {
		console.log("* drawSingleTile", tile, x, y);
		this.sectorView.drawTileIso(tile, y, x);
	}

	redrawTiles() {
		this.sectorView.renderScene();
	}

	mapMoveCompleteHandler(e: Phaser.Sprite, p: Phaser.Point) {
		console.log("* mapMoveComplete", e, p);
		var grid: Phaser.Sprite;

		// stop rendering
		this.lockTheRenderer(false);
		if (this.sectorView.renderTimerActive === false) {
			this.game.time.events.add(Phaser.Timer.SECOND * 2, this.lockTheRenderer, this);
			this.sectorView.renderTimerActive = true;
		}
	}

	lockTheRenderer(bool?: boolean) {
		console.log("* lockTheRenderer", bool);
		// stub (forcing lockRender OFF)
		// bool = false;
		if (bool === undefined) bool = true;
		console.log("* render lock", bool);
		this.game.lockRender = bool;
		this.sectorView.renderTimerActive = false;
	}

}

export { SectorController };
