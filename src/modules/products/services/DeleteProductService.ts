import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { IService } from '@shared/interfaces/IServices';
import { getCustomRepository } from 'typeorm';

interface IDeleteProductRequest {
  id: string;
}

export default class DeleteProductService
  implements IService<IDeleteProductRequest, void>
{
  public async execute({ id }: IDeleteProductRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) throw new AppError('Product not found');

    await productRepository.remove(product);
  }
}
