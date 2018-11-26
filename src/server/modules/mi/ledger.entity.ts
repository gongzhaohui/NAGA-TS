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
@Column()
  spec: string;
  @Column()  spec_o: string;
  @Column() maker: string;
  @Column() material: string;

  /**
   * general
   * spare
   * inspect
   * @type {string}
   * @memberof LedgerEntity
   */
  @Column()usage: string;

/**
 * internal
 * external
 * @type {string}
 * @memberof LedgerEntity
 */
@Column()source: string;

@Column()verificationPeriod: number;
@Column()verificationPeriodUnit: string;

@Column()lastVeriDate: Date;

@Column()verificationStatus: string;

@Column()shelfNo: string;

@Column()drawerNo: string;

@Column()serial: number;

@Column()bearer: string;

}
