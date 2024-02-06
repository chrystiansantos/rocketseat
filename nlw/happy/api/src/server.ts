import express from 'express';
import path from 'path';
import './database/connection';
import cors from 'cors';

import 'express-async-errors';

import routes from './routes';
import erroHandler from './errors/handler';

const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'tmp')));
app.use(erroHandler);
app.listen(3333, () => {
  console.log('Aplicacao rodando na porta 3333');
});
