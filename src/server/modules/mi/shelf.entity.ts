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
export class ShelfEntity {
@PrimaryColumn()id: string;
@Column()shelfNo: string;

@Column()drawerNo: string;

@Column() available: number;

}
