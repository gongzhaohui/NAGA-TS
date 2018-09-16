import { Inject, Injectable } from '@nestjs/common';
// import {DatabaseModule} from '../database/database.module';
import { Database, DocumentCollection } from 'arangojs';

import { DB_CONNECTION_TOKEN, USER_MODEL_TOKEN } from 'server.constants';
import { BaseService } from '../database/base.service';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService extends BaseService {
  constructor(@Inject(DB_CONNECTION_TOKEN) private readonly db: Database) {
    super();
  }

  collection: DocumentCollection = this.db.collection('users');
}
