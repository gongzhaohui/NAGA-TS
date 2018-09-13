<<<<<<< HEAD
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
=======
import {Body, Controller, Get, Param, Post} from '@nestjs/common';

import {UserService} from './user.service';
>>>>>>> original

@Controller('api/users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}
<<<<<<< HEAD
}
=======
  @Get()
  async findAll(): Promise<any>{
    return await this.userService.getUsers();
  }
}
>>>>>>> original
