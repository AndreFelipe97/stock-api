import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { Joi, Segments, celebrate } from 'celebrate';

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get('/', usersController.list);

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
