import BigNumber from 'bignumber.js';

import { Account } from './Account';

export class SavingsAccount extends Account {
	private _profitabilityMonthly: number;

	constructor(number: string, profitabilityMonthly: number) {
		super(number);
		this._profitabilityMonthly = BigNumber(profitabilityMonthly).dividedBy(100).toNumber();
	}

	public get profitabilityMonthly(): number {
		return this._profitabilityMonthly;
	}

	public set profitabilityMonthly(value: number) {
		this._profitabilityMonthly = value;
	}

	public calculateBalance() {
		return this.getBalance();
	}

	private getDayMonthYear(date: Date) {
		const day = date.getDate();
		const month = date.getMonth();
		const year = date.getFullYear();
		return {day, month, year};
	}

	public calculateMonthlyYield(date: Date = new Date) {
		const currentDate = this.getDayMonthYear(date);
		const { day: currentDay, month: currentMonth, year: currentYear } = currentDate;

		const profitabilityMonthly = BigNumber(this._profitabilityMonthly);
		let amountOfDebtForEachCredit = 0;
		const amountCredits = this._credits.length;

		if (amountCredits > 0) {
			const sumDebts = this.sumDebts();
			amountOfDebtForEachCredit = sumDebts / amountCredits;
		}

		for (const credit of this._credits) {
			const { day, month, year } = this.getDayMonthYear(credit.date);

			const isEndMonth = (day === 29 || day === 30 || day === 31);
			const isPaydayofDeposit = (currentDay === day || (isEndMonth && currentDay === 1));

			if (currentYear >= year && currentMonth > month && isPaydayofDeposit) {
				const remaingDepositBalance = BigNumber(credit.creditPlusIncomes()).minus(amountOfDebtForEachCredit).toNumber();

				const monthlyYield = this.calculateYield(remaingDepositBalance);
				credit.addIncome(monthlyYield);
			}
		}
	}

	public calculateYield(value: number) {
		const profitabilityMonthly = BigNumber(this._profitabilityMonthly);

		return profitabilityMonthly.times(value).toNumber();
	}
}
