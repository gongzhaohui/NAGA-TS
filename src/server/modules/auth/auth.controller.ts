import {
  Controller,
  Post,
  Get,
  Body
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { IToken } from './interfaces/token.interface';
import { Roles } from '../../decorators/roles.decorator';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { Credentials } from '../user/dto/Credentials';
import { UserEntity } from 'modules/user/user.entity';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  async SignIn(@Body() user: Credentials): Promise<IToken> {
    // console.log('req:' + JSON.stringify( user));
    // console.log(JSON.stringify(body.user));
    const accessToken = await this.authService.signIn(user);
    return {
      accessToken,
    };
  }
  @Post('signUp')
  async signUp(@Body() theOne: UserEntity) {
    return await this.authService.signUp(theOne);
  }
  @Post('updatePassword')
  async changePassword(@Body() user: Credentials): Promise<IToken> {
    // console.log('req:' + JSON.stringify( user));
    // console.log(JSON.stringify(body.user));
    const accessToken = await this.authService.changePassword(user);
    return {
      accessToken,
    };
  }
  @Get('authorized')
  @ApiBearerAuth()
  @Roles('user')
  public async authorized() {
    // swagger authorization : bearer token
    console.log('Authorized route...');
  }
}
