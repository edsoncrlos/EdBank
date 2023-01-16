import BigNumber from 'bignumber.js';

import { Debit } from './Transaction/Debit';
import { Credit } from './Transaction/Credit';
import { Client } from '../Person/Client/Client';

export abstract class Account {
	private _number: string;
	protected _debts: Array<Debit>;
	protected _credits: Array<Credit>;
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
		let sum = BigNumber(0);
		for (const credit of this._credits) {
			sum = sum.plus(credit.getValue());
		}
		return sum.toNumber();
	}

	public sumDebts () {
		let sum = BigNumber(0);
		for (const debit of this._debts) {
			sum = sum.plus(debit.value);
		}
		return sum.toNumber();
	}

	public getBalance () {
		const sumCredits = BigNumber(this.sumCredits());
		const sumDebts = this.sumDebts();

		return sumCredits.minus(sumDebts).toNumber();
	}

	deposit(value: number, date: Date = new Date) {
		if (value > 0) {
			this._credits.push(new Credit(value, date));
			return true;
		}
		return false;
	}

	public abstract calculateBalance(): number;

	public withdraw(value: number, date: Date) {
		const balance = this.calculateBalance();
		if (balance >= value && value > 0) {
			this.addDebit(value);
			return true;
		}
		return false;
	}

	protected addDebit(value: number) {
		this._debts.push(new Debit(value, new Date));
	}
}
