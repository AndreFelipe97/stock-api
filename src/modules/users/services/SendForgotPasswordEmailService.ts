import { getCustomRepository } from 'typeorm';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

interface ISendForgotPasswordEmailService {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({
    email,
  }: ISendForgotPasswordEmailService): Promise<void> {
    const userTokenRepository = getCustomRepository(UserTokensRepository);
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) throw new AppError('User does not exists.');

    const token = await userTokenRepository.generate(user.id);

    console.log(token);
  }
}
