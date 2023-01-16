import BigNumber from 'bignumber.js';
import { Transaction } from './Transaction';

export class Credit extends Transaction {
	public getValue() {
		return this.value;
	}
}

export class CreditForSavingsAccount extends Credit {
	private _incomes: Array<Credit>;
	private _valueToIncomeAndNextInvest: number;

	constructor (value: number, date: Date) {
		super(value, date);
		this._incomes = [];
		this._valueToIncomeAndNextInvest = value;
	}

	public get valueToIncomeAndNextInvest(): number {
		return this._valueToIncomeAndNextInvest;
	}

	public addIncome(value: number) {
		this._incomes.push(new Credit(value, new Date));
		const valueToIncomeAndNextInvest = new BigNumber(this._valueToIncomeAndNextInvest);
		this._valueToIncomeAndNextInvest = valueToIncomeAndNextInvest.plus(value).toNumber();
	}

	public sumIncomes() {
		let sum = BigNumber(0);
		for (const income of this._incomes) {
			sum = sum.plus(income.value);
		}
		return sum.toNumber();
	}

	public getValue() {
		return BigNumber(this.sumIncomes()).plus(this.value).toNumber();
	}

	public withdrawDeposit(value: number) {
		const result = BigNumber(value).minus(this._valueToIncomeAndNextInvest).toNumber();
		if (result >= 0) {
			this._valueToIncomeAndNextInvest = 0;
			return result;
		} else {
			this._valueToIncomeAndNextInvest = Math.abs(result);
			return 0;
		}
	}

	public get incomes(): Array<Credit> {
		return this._incomes;
	}
}
