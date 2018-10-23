import {Body, Controller, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import * as _ from 'lodash';
import {ApiBearerAuth } from '@nestjs/swagger';
// import {AuthService} from '../auth/auth.service';
import {UserService} from './user.service';
import { IUser } from './interfaces/user.interface';
import {CreateUserDto } from './dto/create.user.dto';
import {DeepPartial} from 'typeorm';
import {UserEntity} from './user.entity';

// import { object } from 'joi';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getAllOrByBindVars(@Query() bindVars: object): Promise<any> {
    // console.log('bindVars' + JSON.stringify(bindVars) + ';' + !bindVars);
    let rst: any;
    if (_.isEmpty(bindVars)) {
      rst = await this.userService.findAll();
    } else {
      rst = await this.userService.findOne(bindVars);
    }
    return rst;
  }

  @Get(':id')
  async getByKey(@Param('id') id: string): Promise<any> {
    // console.log('bindVars' + JSON.stringify({ _key: id }));
    // return await this.userService.getOne({ gender: id });
    return await this.userService.findOneById(id);
  }
  @Post()
  async addOne(@Body() theOne: DeepPartial<UserEntity>) {
    return await this.userService.create(theOne);
  }
}
