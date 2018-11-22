import {Column, BaseEntity, Generated, CreateDateColumn, UpdateDateColumn, VersionColumn, Entity} from 'typeorm';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class SupperEntity extends BaseEntity {

	@ApiModelProperty()
	@Column()
	@Generated('uuid')
	public uuid: string;

	@ApiModelProperty()
	@VersionColumn({
		type: 'int',
		nullable: false
	})
	public version: number;

	@ApiModelProperty()
	@CreateDateColumn({
		type: 'datetime'
	})
	public cratedAt: Date;

	@ApiModelProperty()
	@UpdateDateColumn({
		type: 'smalldatetime'
	})
	public updatedAt: Date;
}
