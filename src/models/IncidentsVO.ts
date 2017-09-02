class IncidentVO {
	private _uid: number;
	private _name: string;
	private _description: string;
	private _structure: number;
	private _entity: number;

	public get uid(): number {
		return this._uid;
	}

	public set uid(value: number) {
		this._uid = value;
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}

	public get description(): string {
		return this._description;
	}

	public set description(value: string) {
		this._description = value;
	}
	
	
}

export { IncidentVO };