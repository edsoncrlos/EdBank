export abstract class Person {
	private _cpf: string;
	private _name: string;
	private _phone: string;

	constructor(cpf: string, name: string, phone: string) {
		this._cpf = cpf;
		this._name = name;
		this._phone = phone;
	}

	public get cpf(): string {
		return this._cpf;
	}

	public set cpf(value: string) {
		this._cpf = value;
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}

	public get phone(): string {
		return this._phone;
	}

	public set phone(value: string) {
		this._phone = value;
	}
}
