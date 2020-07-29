import {ApiProperty} from '@nestjs/swagger';
export class Credentials {
  @ApiProperty()  _key: string;
  @ApiProperty() password: string;
  @ApiProperty() newPassword?: string;
  @ApiProperty() email?: string;
}
