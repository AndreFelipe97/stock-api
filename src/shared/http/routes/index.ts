import { Request, Response, Router } from 'express';
import productsRoutes from '@modules/products/routes/Products.routes';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Welcome!' });
});

routes.use('/products', productsRoutes);

export default routes;
