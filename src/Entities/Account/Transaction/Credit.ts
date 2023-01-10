import BigNumber from 'bignumber.js';
import { Transaction } from './Transaction';

export class Credit extends Transaction {
	private _incomes: Array<Income>;

	constructor (value: number, date: Date) {
		super(value, date);
		this._incomes = [];
	}

	public addIncome(value: number) {
		this._incomes.push(new Income(value, new Date));
	}

	public sumIncomes() {
		let sum = BigNumber(0);
		for (const income of this._incomes) {
			sum = sum.plus(income.value);
		}
		return sum.toNumber();
	}

	public creditPlusIncomes() {
		return BigNumber(this.sumIncomes()).plus(this.value).toNumber();
	}

	public get incomes(): Array<Income> {
		return this._incomes;
	}
	public set incomes(value: Array<Income>) {
		this._incomes = value;
	}
}

export class Income extends Transaction {

}
