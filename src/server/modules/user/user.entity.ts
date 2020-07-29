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
import {  ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SupperEntity } from '../../base';
import { hashSync } from 'bcryptjs';

@Entity()
export class UserEntity extends SupperEntity {
  @ApiProperty()
  @IsString()
  @PrimaryColumn({ length: 10 })
  _key: string;

  @ApiProperty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Column({ nullable: true })
  birthed?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  firstName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Column({ nullable: true })
  lastName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Column({ nullable: true, length: 5, default: 'man' })
  gender: string;

  @ApiProperty()
  @MinLength(7)
  @Column()
  public password: string;

  @ApiProperty()
  @IsArray()
  @Column('simple-array')
  roles: string[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password);
  }
}
