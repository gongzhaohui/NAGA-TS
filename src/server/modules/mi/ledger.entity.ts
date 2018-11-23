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
export class LedgerEntity extends SupperEntity {
  @ApiModelProperty()
  @IsString()
  @PrimaryColumn({ length: 20 })
  code: string;

  spec: string;
  spec_o: string;
  maker: string;
  material: string;

  /**
   * general
   * spare
   * inspect
   * @type {string}
   * @memberof LedgerEntity
   */
  usage: string;

/**
 * internal
 * external
 * @type {string}
 * @memberof LedgerEntity
 */
source: string;

verificationPeriod: number;
verificationPeriodUnit: string;

lastVeriDate: Date;

verificationStatus: string;

shelfNo: string;

drawerNo: string;

serial: number;

bearer: string;

}
