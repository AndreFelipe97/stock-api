import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

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

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.secret,
    });

    return {
      user,
      token,
    };
  }
}
