import {
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { IToken } from './interfaces/token.interface';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginUserDto } from '../user/dto/login.user.dto';
import { CreateUserDto } from '../user/dto/create.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  async SignIn(@Body() user: LoginUserDto): Promise<IToken> {
    // console.log('req:' + JSON.stringify( user));
    // console.log(JSON.stringify(body.user));
    const accessToken = await this.authService.signIn(user);
    return {
      accessToken,
    };
  }
  @Post('signUp')
  async signUp(@Body() theOne: CreateUserDto) {
    return await this.authService.signUp(theOne);
  }
  @Post('updatePassword')
  async updatePassword(@Body() user: LoginUserDto): Promise<IToken> {
    // console.log('req:' + JSON.stringify( user));
    // console.log(JSON.stringify(body.user));
    const accessToken = await this.authService.updatePassword(user);
    return {
      accessToken,
    };
  }
  @Get('authorized')
  @ApiBearerAuth()
  @Roles('user')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @UseGuards(AuthGuard('jwt'))
  public async authorized() {
    console.log('Authorized route...');
  }
}
