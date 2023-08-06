import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
  public async findeByName(name: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        name,
      },
    });
    return user;
  }

  public async findeById(id: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  public async findeByEmail(email: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}
