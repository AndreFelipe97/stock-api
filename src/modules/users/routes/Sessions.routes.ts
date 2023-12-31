import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { Joi, Segments, celebrate } from 'celebrate';

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

sessionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRoutes;
