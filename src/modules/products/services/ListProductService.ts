import Product from '@modules/products/typeorm/entities/Product';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import { IServiceList } from '@shared/interfaces/IServices';
import { getCustomRepository } from 'typeorm';

export default class ListProductService implements IServiceList<Product[]> {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const products = await productRepository.find();

    return products;
  }
}
