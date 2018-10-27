import {Body, Controller, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import * as _ from 'lodash';

import {ApiBearerAuth, ApiUseTags} from '@nestjs/swagger';
import {UserService} from './user.service';
import {UserEntity} from './user.entity';
import {BaseController} from '../../base';

@ApiUseTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController extends BaseController<UserEntity> {

	constructor(protected service: UserService) {
		super();
	}
}

// import { object } from 'joi';
