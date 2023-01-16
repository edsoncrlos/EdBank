import BigNumber from 'bignumber.js';

import { Account } from './Account';
import { CreditForSavingsAccount } from './Transaction/Credit';

export class SavingsAccount extends Account {
	private _profitabilityMonthly: number;
	private _numberOfYieldDays = 28;
	private _depositsNotWithdraw: Array<CreditForSavingsAccount[]>;

	constructor(number: string, profitabilityMonthly: number) {
		super(number);
		this._profitabilityMonthly = BigNumber(profitabilityMonthly).dividedBy(100).toNumber();

		this._depositsNotWithdraw = new Array(this._numberOfYieldDays);
		for (let index = 0; index < this._numberOfYieldDays; index++) {
			this._depositsNotWithdraw[index] = new Array<CreditForSavingsAccount>;
		}
	}

	public get profitabilityMonthly(): number {
		return this._profitabilityMonthly;
	}

	public set profitabilityMonthly(value: number) {
		this._profitabilityMonthly = value;
	}

	private isEndMonth(day: number) {
		return (day === 29 || day === 30 || day === 31);
	}

	private getIndex(day: number) {
		let index = day - 1;
		if (this.isEndMonth(day)) {
			index = 0;
		}
		return index;
	}

	deposit(value: number, date: Date = new Date): boolean {
		if (value > 0) {
			const credit = new CreditForSavingsAccount(value, date);
			this._credits.push(credit);

			const day = date.getDate();
			const index = this.getIndex(day);

			this._depositsNotWithdraw[index].push(credit);

			return true;
		}
		return false;
	}

	public withdraw(value: number, date: Date = new Date) {
		const balance = this.calculateBalance();
		if (balance >= value && value > 0) {
			this.addDebit(value);

			const day = date.getDate();

			let initial = this.getIndex(day);
			if (this.isEndMonth(day)) {
				initial = this._numberOfYieldDays;
			}

			this.removeDepositsForWithdraw(initial, value);
			return true;
		}
		return false;
	}

	private removeDepositsForWithdraw(indexOfTheDay: number, value: number) {
		while (value > 0) {
			const creditsForCurrentDay = this._depositsNotWithdraw[indexOfTheDay];

			if (creditsForCurrentDay != undefined) {
				for (const credit of creditsForCurrentDay) {
					value = credit.withdrawDeposit(value);
					if (credit.valueToIncomeAndNextInvest === 0) {
						creditsForCurrentDay.shift();
					}
					if (value === 0) {
						break;
					}
				}
			}

			if (indexOfTheDay === 0) {
				indexOfTheDay = this._numberOfYieldDays;
			}
			indexOfTheDay--;
		}
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
		const currentDay = date.getDate();

		if (this.isEndMonth(currentDay)) {
			return;
		}

		const index = this.getIndex(currentDay);
		const currentDayCreditsThatYield = this._depositsNotWithdraw[index];

		if (currentDayCreditsThatYield != undefined) {
			for (const credit of currentDayCreditsThatYield) {
				this.calculateYieldOfCredit(date, credit);
			}
		}
	}

	public calculateYieldOfCredit(currentDate: Date, credit: CreditForSavingsAccount) {
		const { day: currentDay, month: currentMonth, year: currentYear } = this.getDayMonthYear(currentDate);
		const { day, month, year } = this.getDayMonthYear(credit.date);

		const isDepositDayEndMonth = this.isEndMonth(day);
		const isPaydayofDeposit = (currentDay === day || (isDepositDayEndMonth && currentDay === 1));

		if (currentYear >= year && currentMonth > month && isPaydayofDeposit) {
			const monthlyYield = this.calculateYield(credit.valueToIncomeAndNextInvest);
			credit.addIncome(monthlyYield);
		}
	}

	public calculateYield(value: number) {
		const profitabilityMonthly = BigNumber(this._profitabilityMonthly);

		return profitabilityMonthly.times(value).toNumber();
	}
}
