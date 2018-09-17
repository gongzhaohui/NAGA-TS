import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import * as _ from 'lodash';
import { UserService } from './user.service';
// import { object } from 'joi';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllOrByBindVars(@Query() bindVars: object): Promise<any> {
    // console.log('bindVars' + JSON.stringify(bindVars) + ';' + !bindVars);
    let rst: any;
    if (_.isEmpty(bindVars)) {
      rst = await this.userService.getAll({});
    } else {
      rst = await this.userService.getByBindVars(bindVars);
    }
    return rst;
  }

  @Get(':id')
  async getByKey(@Param('id') id: string): Promise<any> {
    // console.log('bindVars' + JSON.stringify({ _key: id }));
    // return await this.userService.getOne({ gender: id });
    return await this.userService.getByKey(id);
  }
}
