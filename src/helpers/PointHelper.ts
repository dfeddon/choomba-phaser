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

	static isometricToCartesianAdjusted(isoPt: Phaser.Point, texture: Phaser.RenderTexture, cam?: Phaser.Camera): Phaser.Point {
		let orig: Phaser.Point = this.isometricToCartesian(isoPt);
		let adjust: Phaser.Point;
		console.log("====================");
		console.log('pt x/y:', orig.x, orig.y);
		console.log("txtur x/y/w/h:", texture.width/2, texture.height/2);
		console.log("cam", cam.x, cam.y);
		console.log("====================");
		// if (orig.x < (texture.width / 2))
		// 	orig.x = orig.x
		return isoPt;
	}
}

export { PointHelper };