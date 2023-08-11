import { Request, Response, Router } from 'express';
import productsRoutes from '@modules/products/routes/Products.routes';
import usersRoutes from '@modules/users/routes/Users.routes';
import sessionsRoutes from '@modules/users/routes/Sessions.routes';
import isAuthenticated from '@shared/middlewares/isAuthenticated';
import passwordRoutes from '@modules/users/routes/Password.routes';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Welcome!' });
});

routes.use('/sessions', sessionsRoutes);
routes.use('/passwords', passwordRoutes);
routes.use('/products', isAuthenticated, productsRoutes);
routes.use('/users', usersRoutes);

export default routes;
