import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log('connection database success'))
  .catch(() => console.log('connection database failure'));
