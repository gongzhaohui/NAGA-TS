import {Column, BaseEntity, Generated, CreateDateColumn, UpdateDateColumn, VersionColumn, Entity} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

@Entity()
export class SupperEntity extends BaseEntity {

	@ApiProperty()
	@Column()
	@Generated('uuid')
	public uuid: string;

	@ApiProperty()
	@VersionColumn({
		type: 'int',
		nullable: false
	})
	public version: number;

	@ApiProperty()
	@CreateDateColumn({
		type: 'datetime'
	})
	public cratedAt: Date;

	@ApiProperty()
	@UpdateDateColumn({
		type: 'smalldatetime'
	})
	public updatedAt: Date;
}
