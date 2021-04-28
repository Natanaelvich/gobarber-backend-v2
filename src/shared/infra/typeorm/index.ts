import { createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

getConnectionOptions().then(options => {
  const newOptions = options as IOptions;
  newOptions.host = 'mysql'; // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
  createConnection({ ...options })
    .then(() => console.log('connection database mysql 🎉'))
    .catch(err => console.log('connection database mysql fail ', err));
});

getConnectionOptions().then(options => {
  const newOptions = options as IOptions;
  newOptions.host = 'mongodb'; // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
  createConnection({ ...options })
    .then(() => console.log('connection database mongo 🦎'))
    .catch(err => console.log('connection database mongo fail ', err));
});
