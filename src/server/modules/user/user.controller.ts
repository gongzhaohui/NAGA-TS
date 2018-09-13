import {Body, Controller, Get, Param, Post} from '@nestjs/common';

import {UserService} from './user.service';

@Controller('api/users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}
  @Get()
  async findAll(): Promise<any>{
    return await this.userService.getUsers();
  }
}
