import { Inject, Injectable } from '@nestjs/common';
// import {DatabaseModule} from '../database/database.module';
import { Database, DocumentCollection } from 'arangojs';

import { DB_CONNECTION_TOKEN, USER_MODEL_TOKEN } from '../../server.constants';

import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@Inject(DB_CONNECTION_TOKEN) private readonly db: Database) {}

  private readonly varCollection: DocumentCollection = this.db.collection(
    'users',
  );

  async getAll(): Promise<any> {
    const rst: any = await this.varCollection.all();
    return rst._result;
  }
  async getByKey(_key: string): Promise<any> {
    const rst: any[] = await this.varCollection.lookupByKeys([_key]);
    return rst[0];
  }
  async getByKeys(_key: string[]): Promise<any> {
    return await this.varCollection.lookupByKeys([..._key]);
  }
  async getOne(bindVars: object): Promise<any> {
    return await this.varCollection.firstExample(bindVars);
  }
  async updateBykey(_key: string, body: any): Promise<any> {
    return await this.varCollection.update(_key, body, { returnNew: true });
  }
  async insertOne(body: any): Promise<any> {
    return await this.varCollection.save(body, { returnNew: true });
  }
  // async insertList(list: any[]): Promise<any[]> { }
  async deleteOne(_key: string): Promise<any> {
    return await this.varCollection.removeByKeys([_key], {});
  }
  async deleteByKeys(_keys: string[]): Promise<any> {
    return await this.varCollection.removeByKeys([..._keys], {});
  }
}
