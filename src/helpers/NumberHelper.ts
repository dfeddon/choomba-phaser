class NumberHelper {
	constructor() {
	}

	static UIDGenerator(): number {
		let counter = Date.now() % 1e9;
		return (Math.random() * 1e9 >>> 0) + (counter++);
	}
	static randomRange(min: number, max: number): number {
		// console.log("== NumberHelper.randomRange ==", min, max);
		return Math.floor(min + Math.random() * (max + 1 - min));
	}
}

export { NumberHelper };