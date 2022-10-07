//modulos externos
import inquirer from 'inquirer';
import chalk from 'chalk';
//modulos internos
import fs from 'fs';

console.log(chalk.bgBlue.white.bold('iniciamos o account'));
operation();
//exibindo as acoes para usuario

function operation() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
          'Criar conta',
          'Consultar saldo',
          'Depositar',
          'Sacar',
          'Sair',
        ],
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
          getAccountBalance();
          break;
        case 'Depositar':
          deposit();
          break;
        case 'Sacar':
          widthDraw();
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
//criando a conta
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
      fs.writeFileSync(`accounts/${name}.json`, '{"balance":0}', (err) => {
        console.log(err);
      });
      console.log(chalk.green('Sua conta foi criada'));
      operation();
    })
    .catch((erro) => {
      console.log(err);
    });
}

//funcao para sair
function Exit() {
  console.log(chalk.bgBlue.black('Obrigado por usar o Accounts '));
  process.exit();
}

//função para deposito
function deposit() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual nome da sua conta',
      },
    ])
    .then((resposta) => {
      const accountName = resposta['accountName'];
      //verificar se a conta existe
      if (!checkAccount(accountName)) {
        return deposit();
      }
      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja depositar?',
          },
        ])
        .then((answer) => {
          const amount = answer['amount'];
          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((erro) => console.log(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed('Esta conta não existe, escolha outro nome!'));
    return false;
  }
  return true;
}

function addAmount(accountName, amount) {
  const account = getAccount(accountName);
  if (!amount) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro ,tente novamente mais tarde'),
    );
    return deposit();
  }
  account.balance = parseFloat(amount) + parseFloat(account.balance);
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(account),
    (err) => {
      console.log(chalk.bgRed(err));
    },
  );
  console.log(
    chalk.green(`Foi depositado o valor de R$ ${amount} na sua conta.`),
  );
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r',
  });
  return JSON.parse(accountJSON);
}

function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: 'account',
        message: 'Qual o nome da sua conta',
      },
    ])
    .then((answer) => {
      const accountName = answer['account'];
      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }
      const account = getAccount(accountName);
      console.log(
        chalk.bgBlue.black(
          `Olá , o saldo da sua conta é de R$ ${account.balance}`,
        ),
      );
      operation();
    })
    .catch((err) => console.log(err));
}

function widthDraw() {
  
}
