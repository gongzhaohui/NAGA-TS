import {Body, Controller, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import * as _ from 'lodash';

import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {UserService} from './user.service';
import {UserEntity} from './user.entity';
import {BaseController} from '../../base';
import { Roles } from '../../decorators/roles.decorator';
@ApiTags('users')
@ApiBearerAuth()
@Roles('admin')
@Controller('users')
export class UserController extends BaseController<UserEntity> {

	constructor(protected service: UserService) {
		super();
	}
}

// import { object } from 'joi';
