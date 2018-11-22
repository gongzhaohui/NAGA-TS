import { Inject, Injectable } from '@nestjs/common';
import { Repository, DeepPartial} from 'typeorm';
import { USER_MODEL_TOKEN_MSSQL} from 'server.constants';
import { BaseService } from '../../base';
import {UserEntity} from './user.entity';

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
  // public async create(data: DeepPartial<UserEntity>): Promise<UserEntity> {
	// 	const entity: T = this.repository.create(data);
	// 	await this.validate(entity);
	// 	return entity.save();
	// }

}
