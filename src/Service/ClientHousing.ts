import { Address } from "../Entities/Person/Client/Address";
import { Client } from "../Entities/Person/Client/Client";

export class ClientToAdress {
	private _addresses: Array<Address>;
	private _clients: Array<Client>;

	constructor () {
		this._addresses = [];
		this._clients = [];
	}

	public addClient(cpf: string, name: string, phone: string, isVip: boolean) {
		const client: Client | undefined = this.containsClient(cpf);

		if (client != undefined) {
			return false;
		}
		this._clients.push(new Client(cpf, name, phone, isVip));
		return true;
	}

	public addAdress (cpf: string, cep: string, publicPlace: string, number: string, complement: string, city: string, uf: string) {
		let address: Address | undefined = this.containsAdress(cep);
		const client: Client | undefined = this.containsClient(cpf);

		if (client != undefined && address === undefined) {
			address = new Address(cep, publicPlace, number, complement, city, uf);
			address.client = client;
			client.addAddresses(address);
			return true;
		}
		return false;
	}

	public containsClient(cpf: string) {
		return this._clients.find((client) => {
			if (client.cpf === cpf) {
				return client;
			}
		});
	}

	public containsAdress(cep: string) {
		return this._addresses.find((address) => {
			if (address.cep === cep) {
				return address;
			}
		});
	}
}
