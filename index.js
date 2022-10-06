//modulos externos
import inquirer from 'inquirer';
import chalk from 'chalk';
//modulos internos
import fs from 'fs';

console.log(chalk.bgBlue.white.bold('iniciamos o account'));
operator();

function operator() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: ['Criar conta', 'Consultar saldo', 'Depositar', 'Sair'],
      },
    ])
    .then((answer) => {
      const action = answer['action'];
      console.log(action);
      // if (action === 'Criar conta') createAccount();
      switch (action) {
        case 'Criar conta':
          createAccount();
          break;

        default:
          console.log(
            chalk.bgRed('Opção inválida!! Escolha umas das opções acima'),
          );
          break;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function createAccount() {
  console.log(chalk.bgGreen.black('Parabens por escolher o nosso banco!'));
  console.log(chalk.green('Defina as opções da sua conta a seguir.'));
}
