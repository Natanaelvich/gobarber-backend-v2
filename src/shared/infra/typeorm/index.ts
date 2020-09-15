import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log('connection database success'))
  .catch(err => console.log('connection database failure', err));
