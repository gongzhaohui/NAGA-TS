import {ApiModelProperty} from '@nestjs/swagger';
export class Credentials {
  @ApiModelProperty()  _key: string;
  @ApiModelProperty() password: string;
  @ApiModelProperty() newPassword?: string;
  @ApiModelProperty() email?: string;
}
