import BigNumber from 'bignumber.js';

import { Account } from './Account';

export class SavingsAccount extends Account {
	private _profitabilityMonthly: number;

	constructor(number: string, profitabilityMonthly: number) {
		super(number);
		this._profitabilityMonthly = (profitabilityMonthly / 100);
	}

	public get profitabilityMonthly(): number {
		return this._profitabilityMonthly;
	}

	public set profitabilityMonthly(value: number) {
		this._profitabilityMonthly = value;
	}

	public calculateBalance() {
		const monthlyYield = this.calculateYield();
		this.deposit(monthlyYield);

		return this.getBalance();
	}

	public calculateYield() {
		const balance = BigNumber(this.getBalance());
		const profitabilityMonthly = this._profitabilityMonthly;

		return balance.times(profitabilityMonthly).toNumber();
	}
}
