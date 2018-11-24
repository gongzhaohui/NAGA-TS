import {
  IsArray,
  IsEmail,
  IsString,
  IsDate,
  MinLength,
  Validate,
  IsOptional,
} from 'class-validator';
import { Entity, Column, PrimaryColumn, BeforeInsert, BeforeUpdate} from 'typeorm';
// import { Roles } from 'decorators/roles.decorator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { SupperEntity } from '../../base';
import { hashSync } from 'bcryptjs';

@Entity()
export class UserEntity extends SupperEntity {
  @ApiModelProperty()
  @IsString()
  @PrimaryColumn({ length: 10 })
  _key: string;

  @ApiModelProperty()
  @IsString()
  @Column()
  name: string;

  @ApiModelProperty()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsDate()
  @Column({ nullable: true })
  birthed?: Date;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  firstName: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @Column({ nullable: true })
  lastName: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  title?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  @Column({ nullable: true, length: 5, default: 'man' })
  gender: string;

  @ApiModelProperty()
  @MinLength(7)
  @Column()
  public password: string;

  @ApiModelProperty()
  @IsArray()
  @Column('simple-array')
  roles: string[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password);
  }
}
