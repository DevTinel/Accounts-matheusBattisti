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
      switch (action) {
        case 'Criar conta':
          createAccount();
          break;
        case 'Consultar saldo':
          break;
        case 'Depositar':
          break;
        case 'Sair':
          Exit();
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
  console.log(chalk.bgGreen.bold('Parabens por escolher o nosso banco!'));
  console.log(chalk.bgGreen.bold('Defina as opções da sua conta a seguir.'));
  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Digite um nome para sua conta',
      },
    ])
    .then(({ accountName }) => {
      const name = accountName;
      console.info(name);
      if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts');
      }
      if (fs.existsSync(`accounts/${name}.json`)) {
        console.log(
          chalk.bgRed.black('Esta conta já existe, escolha outro nome'),
        );
        buildAccount();
        return;
      }
      fs.writeFileSync(`accounts/${name}.json`, '{"ballance":0}', (err) => {
        console.log(err);
      });
      console.log(chalk.green('Sua conta foi criada'));
      operator();
    })
    .catch((erro) => {
      console.log(err);
    });
}

function Exit() {
  console.log(chalk.bgBlue.black('Obrigado por usar o Accounts '));
  process.exit();
}
