import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';

interface ICreateUserService {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: ICreateUserService): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const userExists = await userRepository.findByEmail(email);

    if (userExists)
      throw new AppError('There is already a user with this email');

    const user = userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);

    return user;
  }
}
