import { Inject, Injectable } from '@nestjs/common';
import {Connection, Repository} from 'typeorm';

import { DB_CONNECTION_TOKEN, USER_MODEL_TOKEN , MSSQL_CONNECTION_TOKEN, USER_MODEL_TOKEN_MSSQL} from 'server.constants';
import { BaseService } from '../../base';
import {UserEntity} from './user.entity';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(@Inject(USER_MODEL_TOKEN_MSSQL) protected readonly repository: Repository<UserEntity>
    // @Inject(DB_CONNECTION_TOKEN) private readonly db: Database,
    //           @Inject(MSSQL_CONNECTION_TOKEN) private readonly connection: Connection,
    //           @Inject(USER_MODEL_TOKEN) private readonly acollection: Repository<UserEntity>
    ) {
    super();
  }
}
