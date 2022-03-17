import typeORM from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from '../../../../database/models/User.schema';
import RepositoryBase from '../../RepositoryBase';

interface Where {
  where: unknown;
  password: string;
}

export class UserLoginRepository extends RepositoryBase {
  private static instance: UserLoginRepository = null;

  static repositoryName = 'Login';

  private constructor() {
    super();
  }

  public static getInstance(typeOrm: typeORM.Repository<unknown>): UserLoginRepository {
    if (!UserLoginRepository.instance) {
      UserLoginRepository.instance = new UserLoginRepository();
    }

    UserLoginRepository.instance.repository = typeOrm;

    return UserLoginRepository.instance;
  }

  public async execute(content: Where): Promise<unknown> {
    try {
      const user = (await this.repository.findOne(content.where)) as User;

      if (user && bcrypt.compareSync(content.password, user.password)) {
        return user;
      }

      return false;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}