import { Person } from '../Person';
import { Address } from './Address';

export class Client extends Person {
	private _isVip: boolean;
	private _addresses: Array<Address>;

	constructor (cpf: string, name: string, phone: string, isVip: boolean) {
		super(cpf, name, phone);
		this._isVip = isVip;
		this._addresses = [];
	}

	public get isVip(): boolean {
		return this._isVip;
	}

	public set isVip(value: boolean) {
		this._isVip = value;
	}

	public addAddresses(address: Address) {
		this._addresses.push(address);
	}

	public listAddresses() {
		this._addresses.forEach((address) => {
			console.log(address.toString() + '\n');
		});
	}
}
