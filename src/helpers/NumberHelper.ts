class NumberHelper {
	constructor() {
	}

	static UIDGenerator(): number {
		var rnd = Math.floor(Math.random() * 10000 + 10000);
		var d: number = Date.now();
		var uid: number = parseInt(d + "" + rnd);
		// var uid: number = parseInt(d) + rnd;//parseInt(Date.now() + "" + rnd);
		console.log("* uidGen", uid, typeof (uid), d);

		return uid;
	}
	static randomRange(min: number, max: number): number {
		// console.log("== NumberHelper.randomRange ==", min, max);
		return Math.floor(min + Math.random() * (max + 1 - min));
	}
}

export { NumberHelper };