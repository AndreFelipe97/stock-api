import Product from '@modules/products/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { IService } from '@shared/interfaces/IServices';
import { getCustomRepository } from 'typeorm';

interface IDetailProductRequest {
  id: string;
}

export default class DetailProductService
  implements IService<IDetailProductRequest, Product>
{
  public async execute({ id }: IDetailProductRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) throw new AppError('Product not found');

    return product;
  }
}
