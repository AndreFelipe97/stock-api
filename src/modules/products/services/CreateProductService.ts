import Product from '@modules/products/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { IService } from '@shared/interfaces/IServices';
import { getCustomRepository } from 'typeorm';

interface ICreateProductRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService
  implements IService<ICreateProductRequest, Product>
{
  public async execute({
    name,
    price,
    quantity,
  }: ICreateProductRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const productExists = await productRepository.findeByName(name);

    if (productExists)
      throw new AppError('There is already one product with this name');

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }
}
