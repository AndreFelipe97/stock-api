import { Request, Response } from 'express';
import ListProductService from '../services/ListProductService';
import DetailProductService from '../services/DetailProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';
import IController from '@shared/interfaces/IController';

export default class ProductController implements IController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listProductService = new ListProductService();
    const products = await listProductService.execute();

    return response.json(products);
  }

  public async detail(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deatilProduct = new DetailProductService();

    const product = await deatilProduct.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({ name, price, quantity });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({ id, name, price, quantity });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });

    return response.json('Product deleted successfully');
  }
}
