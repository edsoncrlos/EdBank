import { AllocateEmployee } from './Service/AllocateEmployee';
import { ManageClients } from './Service/ManageClients';


const app: number = 5;
const clients = new ManageClients();

switch (app) {
	case 1:
		//APP 1
		const contract = new AllocateEmployee();
		contract.addEmployee('12345678903', 'Olivia', '11929129292', 3400, 'gerente');
		contract.addEmployee('09876543213', 'Marcos', '928489939393', 1400, 'atendente');
		console.log(contract);
		break;

	case 2:
		//APP 2
		clients.addClient('09876543213', 'Marcos', '928489939393', false);
		clients.addAddress('09876543213', '6000123', 'bolo quadrado', '04', 'bolo da Ana', 'Confeito Dourado', 'es');
		clients.addAddress('09876543213', '99930323', 'Rua das magueiras', '93', 'Casarão Gomes', 'Gargulândia', 'RS');
		clients.addAddress('09876543213', '933726272', 'Avenida Marechal Dutra', '07', 'Próximo ao comércio do Miguel', 'São Matheus', 'SP');
		clients.containsClient('09876543213')?.listAddresses();
		break;

		case 3:
		// APP 3
		clients.addClient('09876543213', 'Marcos', '928489939393', false);
		clients.addAccount('09876543213', '1234', 1000);
		clients.containsAccount('1234')?.deposit(100)
		clients.containsAccount('1234')?.deposit(100)
		clients.containsAccount('1234')?.deposit(100)
		clients.containsAccount('1234')?.withdraw(50)
		console.log(clients.containsAccount('1234')?.calculateBalance())
		break;

	case 4:
		// APP 4
		clients.addClient('123456789', 'Rafaela', '1198234959', false)
		clients.addAccount('123456789', '1423', 200);
		clients.containsAccount('1423')?.deposit(1000);

		clients.addClient('987654321', 'Carla', '11982346343', false)
		clients.addAccount('123456789', '0987', undefined, 10);
		clients.containsAccount('0987')?.deposit(1000)

		clients.transferAccount('1423', '0987', 500)

		console.log(clients.containsAccount('1423')?.calculateBalance())
		console.log(clients.containsAccount('0987')?.calculateBalance())
		break;

	case 5:
		// APP 5
		clients.addClient('3124567890', 'Pedro', '9497239329', false)
		clients.addAccount('3124567890', '8790', undefined, 1)

		let month = -1;
		for (let i = 1; i <= 365; i++) {
			const date = new Date(2022, 0, i)
			clients.verifyYield(date)
			if (month != date.getMonth()) {
				month = date.getMonth();
				clients.containsAccount('8790')?.deposit(200, date);
			}

			if (date.getMonth() === 2 && date.getDate() === 5) {
				clients.containsAccount('8790')?.withdraw(100);
			}
			if (date.getMonth() === 6 && date.getDate() === 8) {
				clients.containsAccount('8790')?.withdraw(200);
			}
		}
		console.log(clients.containsAccount('8790')?.calculateBalance())
		break;
}

