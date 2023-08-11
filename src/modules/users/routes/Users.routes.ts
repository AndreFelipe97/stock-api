import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { Joi, Segments, celebrate } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import isAuthenticated from '../../../shared/middlewares/isAuthenticated';
import UpdateAvatarController from '../controllers/UpdateAvatarController';

const usersRoutes = Router();
const usersController = new UsersController();
const updateAvatarController = new UpdateAvatarController();

const upload = multer(uploadConfig);

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

usersRoutes.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  updateAvatarController.update,
);

export default usersRoutes;
