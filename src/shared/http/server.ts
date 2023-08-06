import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import ErrorsMiddlewares from '@shared/middlewares/ErrorsMiddlewares';
import '@shared/typeorm';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errors());

app.use(ErrorsMiddlewares);

app.listen(3333, () => {
  console.log('Server started on port 3333! ☁️');
});
