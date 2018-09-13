<<<<<<< HEAD
import { Injectable, Inject } from '@nestjs/common';
import { USER_MODEL_TOKEN } from '../../server.constants';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>,
  ) {}
  async getUsers(): Promise<IUser[]> {
    let a: IUser[];
    return a;
  }
  async getUserByKey(_key: string): Promise<IUser> {
    const a: IUser = { _key: 'gong' };
    return a;
=======
import {Inject, Injectable} from '@nestjs/common';
// import {DatabaseModule} from '../database/database.module';
import {Database, DocumentCollection} from 'arangojs';

import {USER_MODEL_TOKEN, DB_CONNECTION_TOKEN} from '../../server.constants';

import {IUser} from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@Inject(DB_CONNECTION_TOKEN) private readonly db: Database){}

  private readonly varCollection: DocumentCollection = this.db.collection('users');

  async getAll(): Promise<any> {
    return await this.varCollection.all();
  }
  async getByKey(_key: string): Promise<any> {
    return await this.varCollection.firstExample({_key});
  }
  async getOne(bindVars: any): Promise<any> {
    return await this.varCollection.firstExample(bindVars);
  }
  async updateBykey(_key: string, body: any): Promise<any> {return await this.varCollection.update(_key, body, {returnNew: true}); }
  async insertOne(body: any): Promise<any> { return await this.varCollection.save(body); }
  // async insertList(list: any[]): Promise<any[]> { }
  async deleteOne(_key: string): Promise<any> { return await this.varCollection.removeByKeys([_key], {}); }
  async deleteByKeys(_keys: string[]): Promise<any> {
    return await this.varCollection.removeByKeys([..._keys], {});
>>>>>>> original
  }
}
