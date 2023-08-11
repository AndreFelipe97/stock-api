import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import User from '../typeorm/entities/User';

interface IUpdateAvatarService {
  userId: string;
  avatarFilename: string | undefined;
}

export default class UpdateAvatarService {
  public async execute({
    userId,
    avatarFilename,
  }: IUpdateAvatarService): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(userId);

    if (!user) throw new AppError('User not found!');

    if (!avatarFilename) throw new AppError("Image don't sended");

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}
