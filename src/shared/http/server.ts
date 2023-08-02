import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import ErrorsMiddlewares from '@shared/middlewares/ErrorsMiddlewares';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(ErrorsMiddlewares);

app.listen(3333, () => {
  console.log('Server started on port 3333! ☁️');
});
