import { Inject, Injectable } from '@nestjs/common';
import { Repository, DeepPartial} from 'typeorm';
import { USER_MODEL_TOKEN_MSSQL} from 'server.constants';
import { BaseService } from '../../base';
import {UserEntity} from './user.entity';
import { hashSync, compareSync } from 'bcryptjs';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(@Inject(USER_MODEL_TOKEN_MSSQL) protected readonly repository: Repository<UserEntity>,
              // @InjectRepository(UserEntity) protected readonly UserRepository: Repository<UserEntity>
    // @Inject(DB_CONNECTION_TOKEN) private readonly db: Database,
    //           @Inject(MSSQL_CONNECTION_TOKEN) private readonly connection: Connection,
    //           @Inject(USER_MODEL_TOKEN) private readonly acollection: Repository<UserEntity>
    ) {
    super();
  }

  async signIn(credentials: DeepPartial<UserEntity>): Promise<UserEntity> {
    const user: UserEntity = await this.findOneById(credentials._key);
    if (!user || !compareSync(credentials.password, user.password)) {
      return null;
    }
    return user;
  }
  async changePassword(credentials: DeepPartial<UserEntity>): Promise<UserEntity> {
    if (!credentials.email) {
      throw new UnauthorizedException('The email field is not provided.');
    }
    if (!credentials.password) {
      throw new UnauthorizedException('The password field is not provided.');
    }
    let user: UserEntity = await this.usersService.findOne({_key: credentials._key,
       email: credentials.email
      });
    if (!user) {
      throw new UnauthorizedException('The user key and email are not valid.');
    }
    if (user.password !== '' && !compareSync(credentials.password, user.password)) {
        throw new UnauthorizedException('The password of user is not correct.');
      }
    user = await this.usersService.patch(credentials._key, { password: credentials.newPassword });

    const jwtPayload: IJwtPayload = {
      sub: user._key,
      roles: user.roles,
    };
    return this.createToken(jwtPayload);
  }
	public async update(data: DeepPartial<UserEntity>): Promise<UserEntity> {
		return this.create(data);
	}

	public async patch(id: string, data: DeepPartial<UserEntity>): Promise<UserEntity> {
		const entity: UserEntity = await this.findOneById(id);
		Object.assign(entity, data);
		await validate(entity);
		return entity.save();
	}

}
