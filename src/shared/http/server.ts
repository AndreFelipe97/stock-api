import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import ErrorsMiddlewares from '@shared/middlewares/ErrorsMiddlewares';
import '@shared/typeorm';
import uploadConfig from '@config/upload';
import isAuthenticated from '@shared/middlewares/isAuthenticated';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/files', isAuthenticated, express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use(ErrorsMiddlewares);

app.listen(3333, () => {
  console.log('Server started on port 3333! ☁️');
});
