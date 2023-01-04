import { IUser } from '../../Interfaces/IUser';
import { Person } from '../Person';
import { Role } from './Role';

export class Employee extends Person implements IUser {
	private _salary: number;
	private _role: Array<Role>;

	constructor (cpf: string, name: string, phone: string, salary: number) {
		super(cpf, name, phone);
		this._salary = salary;
		this._role = [];
	}

	public auth() {
		return true;
	}

	public get role(): Array<Role> {
		return this._role;
	}

	public set role(value: Array<Role>) {
		this._role = value;
	}

	public addRole(role: Role) {
		this._role.push(role);
	}

	public get salary(): number {
		return this._salary;
	}

	public set salary(value: number) {
		this._salary = value;
	}
}
