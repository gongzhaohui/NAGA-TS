import {ApiModelProperty} from '@nestjs/swagger';
export class CreateUserDto {
  @ApiModelProperty()
  _key: string;
  @ApiModelProperty() roles: string[];
  @ApiModelProperty() email: string;
  @ApiModelProperty() salt: string;
  @ApiModelProperty() hashedPassword: string;
  @ApiModelProperty() name: String;
  @ApiModelProperty() birthed: String;
  @ApiModelProperty() title: String;
  @ApiModelProperty() gender: String;
}
