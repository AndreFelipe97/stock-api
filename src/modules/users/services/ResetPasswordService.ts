import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

interface IResetPasswordService {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({
    token,
    password,
  }: IResetPasswordService): Promise<void> {
    const userTokenRepository = getCustomRepository(UserTokensRepository);
    const userRepository = getCustomRepository(UsersRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) throw new AppError('User token does not exists.');

    const user = await userRepository.findById(userToken.userId);

    if (!user) throw new AppError('User does not exists.');

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) throw new AppError('Token expired.');

    user.password = await hash(password, 8);

    await userRepository.save(user);
  }
}
