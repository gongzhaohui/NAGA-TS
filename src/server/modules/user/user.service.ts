import { Injectable, Inject } from '@nestjs/common';
// import {DatabaseModule} from '../database/database.module';
import {DocumentCollection} from 'arangojs';
import { USER_MODEL_TOKEN } from '../../server.constants';
import { IUser } from './interfaces/user.interface';
// import { databaseProviders } from '../database/database.providers';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL_TOKEN) private readonly userCollection: DocumentCollection
  ) {}
  async getUsers(): Promise <any>  {
    return await this.userCollection.all();
  }
  async getByKey(_key: string): Promise <any> {
    return await this.userCollection.firstExample({_key});
  }
  async getUser(bindVals)
}
