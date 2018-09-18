import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { IToken } from './interfaces/token.interface';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async requestJsonWebTokenAfterLocalSignUp(@Req() req: Request): Promise<any> {
    return await this.authService.signup(req.user);
  }

  @Post('signin')
  async requestJsonWebTokenAfterLocalSignIn(@Req() req: Request): Promise<any> {
    return await this.authService.signin({ _key: req.user._key , password: req.user.password});
  }

  @Get('authorized')
  @Roles('user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  public async authorized() {
    console.log('Authorized route...');
  }
}
