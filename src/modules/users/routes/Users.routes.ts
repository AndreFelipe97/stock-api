import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { Joi, Segments, celebrate } from 'celebrate';
import isAuthenticated from '../../../shared/middlewares/isAuthenticated';

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get('/', isAuthenticated, usersController.list);

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  usersController.create,
);

export default usersRoutes;
