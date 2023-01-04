import { Account } from '../../Account/Account';
import { IUser } from '../../Interfaces/IUser';
import { Person } from '../Person';
import { Address } from './Address';

export class Client extends Person implements IUser{
	private _isVip: boolean;
	private _addresses: Array<Address>;
	private _accounts: Array<Account>;

	constructor (cpf: string, name: string, phone: string, isVip: boolean) {
		super(cpf, name, phone);
		this._isVip = isVip;
		this._addresses = [];
		this._accounts = [];
	}

	public auth() {
		return true;
	}

	public addAccount(account: Account) {
		this._accounts.push(account);
	}

	public get isVip(): boolean {
		return this._isVip;
	}

	public set isVip(value: boolean) {
		this._isVip = value;
	}

	public get accounts(): Array<Account> {
		return this._accounts;
	}

	public set accounts(value: Array<Account>) {
		this._accounts = value;
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
