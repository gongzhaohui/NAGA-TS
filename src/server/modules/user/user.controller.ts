import {Body, Controller, Get, Param, Post} from '@nestjs/common';

import {UserService} from './user.service';

@Controller('api/users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }
  @Get()
  async getAll(): Promise<any> {
    // console.log('bindVars' + JSON.stringify({ _key: id }));
    return await this.userService.getAll();
  }
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<any> {
    // console.log('bindVars' + JSON.stringify({ _key: id }));
    return await this.userService.getByKey(id );
  }
}
