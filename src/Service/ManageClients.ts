import { Account } from '../Entities/Account/Account';
import { Address } from '../Entities/Person/Client/Address';
import { Client } from '../Entities/Person/Client/Client';
import { CheckingAccount } from '../Entities/Account/CheckingAccount';
import { SavingsAccount } from '../Entities/Account/SavingsAccount';

export class ManageClients {
	private _addresses: Array<Address>;
	private _clients: Array<Client>;
	private _accounts: Array<Account>;

	constructor () {
		this._addresses = [];
		this._clients = [];
		this._accounts = [];
	}

	public addClient(cpf: string, name: string, phone: string, isVip: boolean) {
		const client: Client | undefined = this.containsClient(cpf);

		if (client != undefined) {
			return false;
		}
		this._clients.push(new Client(cpf, name, phone, isVip));
		return true;
	}

	public addAddress (cpf: string, cep: string, publicPlace: string, number: string, complement: string, city: string, uf: string) {
		let address: Address | undefined = this.containsAddress(cep);
		const client: Client | undefined = this.containsClient(cpf);

		if (client != undefined && address === undefined) {
			address = new Address(cep, publicPlace, number, complement, city, uf);
			address.client = client;
			client.addAddresses(address);
			return true;
		}
		return false;
	}

	addAccount(cpf: string, number: string, limit?: number, profitabilityMonthly?: number) {
		const client: Client | undefined = this.containsClient(cpf);
		let account: Account | undefined = this.containsAccount(number);

		if (client != undefined && account === undefined) {
			if (limit != undefined) {
				account = new CheckingAccount(number, limit);
			} else if (profitabilityMonthly != undefined) {
				account = new SavingsAccount(number, profitabilityMonthly);
			}

			if (account != undefined) {
				this._accounts.push(account);
				client.addAccount(account);
				account.client = client;
				return true;
			}
		}
		return false;
	}

	public transferAccount(originAccountNumber: string, destinationAccountNumber: string, value: number) {
		const originAccount: Account | undefined = this.containsAccount(originAccountNumber);
		const destinationAccount: Account | undefined = this.containsAccount(destinationAccountNumber);

		if (originAccount != undefined && destinationAccount != undefined) {
			if (originAccount instanceof CheckingAccount) {
				return originAccount.transfer(destinationAccount, value);
			}
		}
		return false;
	}

	verifyYield (date: Date) {
		this._accounts.forEach((account) => {
			if (account instanceof SavingsAccount) {
				account.calculateMonthlyYield(date);
			}
		});
	}

	public containsClient(cpf: string) {
		return this._clients.find((client) => {
			if (client.cpf === cpf) {
				return client;
			}
		});
	}

	public containsAddress(cep: string) {
		return this._addresses.find((address) => {
			if (address.cep === cep) {
				return address;
			}
		});
	}

	public containsAccount(number: string) {
		return this._accounts.find((account) => {
			if (account.number === number) {
				return number;
			}
		});
	}
}
