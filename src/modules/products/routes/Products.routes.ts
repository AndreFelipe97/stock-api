import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ProductController from '../controllers/ProductsController';

const productsRoutes = Router();
const productsController = new ProductController();

productsRoutes.get('/', productsController.list);

productsRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.detail,
);

productsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().min(0.05).precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create,
);

productsRoutes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().min(0.05).precision(2).required(),
      quantity: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.update,
);

productsRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.delete,
);

export default productsRoutes;
