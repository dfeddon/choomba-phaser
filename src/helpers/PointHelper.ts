import { Point } from "phaser-ce";

class PointHelper {
	constructor() {
	}

	static cartesianToIsometric(cartPt: Phaser.Point): Phaser.Point {
		let tempPt: Phaser.Point = new Phaser.Point();
		tempPt.x = cartPt.x - cartPt.y;
		tempPt.y = (cartPt.x + cartPt.y) / 2;
		return (tempPt);
	}
	static isometricToCartesian(isoPt: Phaser.Point): Phaser.Point {
		let tempPt: Phaser.Point = new Phaser.Point();
		tempPt.x = (2 * isoPt.y + isoPt.x) / 2;
		tempPt.y = (2 * isoPt.y - isoPt.x) / 2;
		return (tempPt);
	}
	static getTileCoordinates(cartPt: Phaser.Point, tileHeight: number): Phaser.Point {
		let tempPt:Phaser.Point = new Phaser.Point();
		tempPt.x = Math.floor(cartPt.x / tileHeight);
		tempPt.y = Math.floor(cartPt.y / tileHeight);
		return (tempPt);
	}

	static iso2cart(isoPt: Phaser.Point, offset: Phaser.Point, size: number): Phaser.Point {
		let tempPt: Phaser.Point = new Phaser.Point();
		tempPt = this.isometricToCartesian(new Phaser.Point((isoPt.x - offset.x) - size, isoPt.y));
		return tempPt;
	}

	static cart2iso(cartPt: Phaser.Point, offset: Phaser.Point, tileWidth?: number, tileHeight?: number) {
		if (!tileWidth)
			tileWidth = 64;
		if (!tileHeight)
			tileHeight = 64;
		let tempPt: Phaser.Point = new Phaser.Point();
		let pt: Phaser.Point = this.cartesianToIsometric(new Phaser.Point(cartPt.x * tileWidth, cartPt.y * tileHeight));
		tempPt.x = pt.x + offset.x;
		tempPt.y = pt.y + offset.y - tileHeight;
		return tempPt;
	}

	static screenToGrid(screenPt: Phaser.Point, offsetPt: Phaser.Point, gridSize: number): Phaser.Point {
		// offsetPt.y = 0;
		let x: number = screenPt.x - offsetPt.x + 2;
		let y: number = ((screenPt.y - offsetPt.y));// / 64) + 2;
		console.log("::::", x, y);
		console.log("+", Math.floor((screenPt.x - offsetPt.x + 2 * (screenPt.y - offsetPt.y)) / 64) + 2);
		let grid_x: number = Math.floor((screenPt.x - offsetPt.x + 2 * (screenPt.y)) / gridSize) + 2;
		// let grid_x: number = Math.floor((screenPt.x - offsetPt.x + 2 * (screenPt.y - offsetPt.y)) / gridSize) + 2;
		let grid_y: number = Math.floor((2 * (screenPt.y - offsetPt.y) - (screenPt.x - offsetPt.x)) / gridSize) + 1; 
		let pt:Point = new Point(grid_x, grid_y);
		return pt;
	}
}

export { PointHelper };