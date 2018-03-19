class PointHelper {
	constructor() {
	}

	static cartesianToIsometric(cartPt: Phaser.Point): Phaser.Point {
		var tempPt = new Phaser.Point();
		tempPt.x = cartPt.x - cartPt.y;
		tempPt.y = (cartPt.x + cartPt.y) / 2;
		return (tempPt);
	}
	static isometricToCartesian(isoPt: Phaser.Point): Phaser.Point {
		var tempPt = new Phaser.Point();
		tempPt.x = (2 * isoPt.y + isoPt.x) / 2;
		tempPt.y = (2 * isoPt.y - isoPt.x) / 2;
		return (tempPt);
	}
	static getTileCoordinates(cartPt: Phaser.Point, tileHeight: number): Phaser.Point {
		var tempPt = new Phaser.Point();
		tempPt.x = Math.floor(cartPt.x / tileHeight);
		tempPt.y = Math.floor(cartPt.y / tileHeight);
		return (tempPt);
	}
}

export { PointHelper };