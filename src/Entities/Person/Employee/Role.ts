import { Employee } from './Employee';

export class Role {
	private _name: string;
	private _employee: Array<Employee>;

	constructor(name: string) {
		this._name = name;
		this._employee = [];
	}

	public addEmployee(employee: Employee) {
		this._employee.push(employee);
	}

	public get employee(): Array<Employee> {
		return this._employee;
	}

	public set employee(value: Array<Employee>) {
		this._employee = value;
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}
}
