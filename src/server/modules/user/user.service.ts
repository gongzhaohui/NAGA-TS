import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { USER_MODEL_TOKEN_MSSQL } from 'server.constants';
import { BaseService } from '../../base';
import { UserEntity } from './user.entity';
import { hashSync, compareSync } from 'bcryptjs';
import { Credentials } from './dto/Credentials';
@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @Inject(USER_MODEL_TOKEN_MSSQL)
    protected readonly repository: Repository<UserEntity>,
  ) // @InjectRepository(UserEntity) protected readonly UserRepository: Repository<UserEntity>
  // @Inject(DB_CONNECTION_TOKEN) private readonly db: Database,
  //           @Inject(MSSQL_CONNECTION_TOKEN) private readonly connection: Connection,
  //           @Inject(USER_MODEL_TOKEN) private readonly acollection: Repository<UserEntity>
  {
    super();
  }

  async signIn(credentials: Credentials): Promise<UserEntity> {
    const user: UserEntity = await this.findOneById(credentials._key);
    if (!user || !compareSync(credentials.password, user.password)) {
      return null;
    }
    return user;
  }
  async changePassword(credentials: Credentials): Promise<UserEntity> {
    if (!credentials.email) {
      throw new UnauthorizedException('The email field is not provided.');
    }
    if (!credentials.password) {
      throw new UnauthorizedException('The password field is not provided.');
    }
    const user: UserEntity = await this.findOne({
      _key: credentials._key,
      email: credentials.email,
    });
    if (!user) {
      throw new UnauthorizedException('The user key and email are not valid.');
    }
    if (
      user.password !== '' &&
      !compareSync(credentials.password, user.password)
    ) {
      throw new UnauthorizedException('The password of user is not correct.');
    }
    return await super.patch(credentials._key, {
      password: hashSync(credentials.newPassword),
    });
  }
  public async update(
    id: string,
    data: DeepPartial<UserEntity>,
  ): Promise<UserEntity> {
    const user = await this.findOneById(id);
    data.password = user.password;
    return await this.create(data);
  }

  public async patch(
    id: string,
    data: DeepPartial<UserEntity>,
  ): Promise<UserEntity> {
    delete data.password;
    return super.patch(id, data);
  }
}
