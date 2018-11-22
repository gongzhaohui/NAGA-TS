import {
  IsArray,
  IsEmail,
  IsString,
  IsDateString,
  MinLength,
  Validate,
} from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';
// import { Roles } from 'decorators/roles.decorator';
import { ApiModelProperty } from '@nestjs/swagger';
import { SupperEntity } from '../../base';

@Entity()
export class UserEntity extends SupperEntity {
  @ApiModelProperty()
  @PrimaryColumn({ length: 10 })
  @IsString()
  _key: string;

  @ApiModelProperty()
  @Column()
  @IsString()
  name: string;

  @ApiModelProperty()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @Column({ nullable: true })
  @IsDateString()
  birthed?: Date;

  @ApiModelProperty()
  @Column({ nullable: true })
  @IsString()
  firstName: string;

  @ApiModelProperty()
  @Column({ nullable: true })
  lastName: string;

  @ApiModelProperty()
  @IsString()
  @Column({ nullable: true })
  title?: string;

  @ApiModelProperty()
  @Column({ nullable: true, length: 5, default: 'man' })
  @IsString()
  gender: string;

  @ApiModelProperty()
  @Column()
  @MinLength(7)
  public hashedPassword: string;

  @ApiModelProperty()
  @Column('simple-array')
  @IsArray()
  roles: string[];
}
