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
  async requestJsonWebTokenAfterLocalSignUp(@Req() req: Request): Promise<IToken> {
    return await this.authService.createToken(req.user);
  }

  @Post('signin')
  async requestJsonWebTokenAfterLocalSignIn(@Req() req: Request): Promise<IToken> {
    return await this.authService.createToken(req.user);
  }

  @Get('authorized')
  @Roles('user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  public async authorized() {
    console.log('Authorized route...');
  }
}
