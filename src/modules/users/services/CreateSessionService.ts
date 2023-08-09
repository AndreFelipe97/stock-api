import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface ICreateSessionService {
  email: string;
  password: string;
}

interface IResponseCreateSessionService {
  user: User;
  token: string;
}

export default class CreateSessionService {
  public async execute({
    email,
    password,
  }: ICreateSessionService): Promise<IResponseCreateSessionService> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) throw new AppError('Incorrect email/password combination.', 401);

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed)
      throw new AppError('Incorrect email/password combination.', 401);

    const token = sign({}, 'fce9f110c9ef97c366fa33e8ec61ce3c', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}
