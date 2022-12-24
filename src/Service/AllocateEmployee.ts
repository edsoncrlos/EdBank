import { Employee } from '../Entities/Person/Employee/Employee';
import { Role } from '../Entities/Person/Employee/Role';

export class AllocateEmployee {
	private _employees: Array<Employee>;
	private _roles: Array<Role>;

	constructor () {
		this._employees = [];
		this._roles = [];
	}

	public addEmployee (cpf: string, name: string, phone: string, salary: number, roleName: string) {

		let role: Role | undefined = this.containsRole(roleName);
		let employee: Employee | undefined = this.containsEmployee(cpf);

		if (role === undefined) {
			role = new Role(roleName);
			this._roles.push(role);
		}

		if (employee === undefined) {
			employee = new Employee(cpf, name, phone, salary, role);
			role.addEmployee(employee);
			this._employees.push(employee);
		} else {
			throw new Error('Employee já está cadastrado');
		}
	}

	public addRole (roleName: string, cpf?: string) {
		let employee: Employee | undefined;
		if (cpf != undefined) {
			employee = this.containsEmployee(cpf);
		}

		let role: Role | undefined = this.containsRole(roleName);

		if (role === undefined) {
			role = new Role(roleName);
			if (employee != undefined) {
				role.addEmployee(employee);
			}
			this._roles.push(role);
		} else {
			throw new Error('O cargo já está cadastrado');
		}
	}

	public containsRole(roleName: string): Role | undefined {
		return this._roles.find((role) => {
			if (role.name === roleName) {
				return role;
			}
		});
	}

	public containsEmployee(cpf?: string): Employee | undefined {
		return this._employees.find((employee) => {
			if (employee.cpf === cpf) {
				return employee;
			}
		});
	}

}
