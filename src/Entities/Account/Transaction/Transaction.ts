export abstract class Transaction {
	private _value: number;
	private _date: Date;

	constructor (value: number, date: Date) {
		this._value = value;
		this._date = date;
	}

	public get value(): number {
		return this._value;
	}

	public set value(value: number) {
		this._value = value;
	}

	public get date(): Date {
		return this._date;
	}

	public set date(value: Date) {
		this._date = value;
	}
}
