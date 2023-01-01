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
		return this.getBalance() + this.calculateYield();
	}

	public calculateYield() {
		return this._profitabilityMonthly * this.getBalance();
	}
}
