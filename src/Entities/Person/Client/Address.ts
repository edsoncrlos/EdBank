import { Client } from './Client';

export class Address {
	private _cep: string;
	private _publicPlace: string;
	private _number: string;
	private _complement: string;
	private _city: string;
	private _uf: string;
	private _client!: Client;

	private isUF (possiblyUf: string) {
		const allUF = ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR', 'SC', 'RS', 'MS', 'MT', 'GO', 'DF'];
		for (const uf of allUF) {
			if (uf === possiblyUf.toUpperCase()) {
				return true;
			}
		}
		return false;
	}

	constructor (cep: string, publicPlace: string, number: string, complement: string, city: string, uf: string) {
		this._cep = cep;
		this._publicPlace = publicPlace;
		this._number = number;
		this._complement = complement;
		this._city = city;
		if (!this.isUF(uf)) {
			throw new Error('It is not a uf');
		}
		this._uf = uf;
	}

	public get cep(): string {
		return this._cep;
	}

	public set cep(value: string) {
		this._cep = value;
	}

	public get publicPlace(): string {
		return this._publicPlace;
	}

	public set publicPlace(value: string) {
		this._publicPlace = value;
	}

	public get number(): string {
		return this._number;
	}

	public set number(value: string) {
		this._number = value;
	}

	public get complement(): string {
		return this._complement;
	}

	public set complement(value: string) {
		this._complement = value;
	}

	public get city(): string {
		return this._city;
	}

	public set city(value: string) {
		this._city = value;
	}

	public get uf() {
		return this._uf;
	}

	public set uf(value: string) {
		this._uf = value;
	}

	public get client(): Client {
		if (this._client === undefined) {
			throw new Error('Client is undefined');
		}
		return this._client;
	}

	public set client(value: Client) {
		this._client = value;
	}

	public toString() {
		return 'cep: ' + this.cep + '\n' +
		'publicPlace: ' + this.publicPlace + '\n' +
		'number: ' + this.number + '\n' +
		'complement: ' + this.complement + '\n' +
		'city: ' + this.city + '\n' +
		'uf: ' + this.uf;
	}
}
