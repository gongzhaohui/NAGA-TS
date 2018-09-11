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
  }
}
