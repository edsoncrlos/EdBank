import { Debit } from './Transaction/Debit';
import { Credit } from './Transaction/Credit';
import { Client } from '../Person/Client/Client';

export abstract class Account {
	private _number: string;
	private _debts: Array<Debit>;
	private _credits: Array<Credit>;
	private _client!: Client;

	constructor(number: string) {
		this._number = number;
		this._debts = [];
		this._credits = [];
	}

	public get number(): string {
		return this._number;
	}
	
	public set number(value: string) {
		this._number = value;
	}
	
	public get client(): Client {
		return this._client;
	}

	public set client(value: Client) {
		this._client = value;
	}

	public sumCredits () {
		let sum = 0;
		for (const credit of this._credits) {
			sum += credit.value;
		}
		return sum;
	}

	public sumDebts () {
		let sum = 0;
		for (const debit of this._debts) {
			sum += debit.value;
		}
		return sum;
	}

	public getBalance () {
		return this.sumCredits() - this.sumDebts();
	}

	deposit(value: number) {
		if (value > 0) {
			this._credits.push(new Credit(value, new Date));
			return true;
		}
		return false;
	}

	public abstract calculateBalance(): number;

	public withdraw(value: number) {
		const balance = this.calculateBalance();
		if (balance >= value) {
			this.addDebit(value);
			return true;
		}
		return false;
	}

	protected addDebit(value: number) {
		this._debts.push(new Debit(value, new Date));
	}
}
