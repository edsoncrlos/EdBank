import BigNumber from 'bignumber.js';

import { Account } from './Account';

export class CheckingAccount extends Account {
	private _limit: number;

	constructor(number: string, limit: number) {
		super(number);
		this._limit = limit;
	}

	public get limit(): number {
		return this._limit;
	}

	public set limit(value: number) {
		this._limit = value;
	}

	transfer (account: Account, value: number) {
		const balance = this.calculateBalance();
		if (balance >= value && value > 0) {
			if (account != this) {
				this.addDebit(value);
				account.deposit(value);
				return true;
			}
		}
		return false;
	}

	public calculateBalance() {
		const balance = BigNumber(this.getBalance());
		const limit = this.limit;

		return balance.plus(limit).toNumber();
	}
}
