// mi->measuring instruments
import {
  IsArray,
  IsEmail,
  IsString,
  IsDate,
  MinLength,
  Validate,
  IsOptional,
} from 'class-validator';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate} from 'typeorm';
// import { Roles } from 'decorators/roles.decorator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { SupperEntity } from '../../base';
import { hashSync } from 'bcryptjs';
import { string } from 'joi';
@Entity()
export class LedgerEntity {
id:number;
shelfNo: string;

drawerNo:string;

available:number;

}
