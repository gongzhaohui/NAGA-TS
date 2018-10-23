import {BaseEntity, DeleteResult, DeepPartial} from 'typeorm';
import {Body, Delete, Get, Param, ParseIntPipe, Patch, Post, Put} from '@nestjs/common';
import {BaseService} from './base.service';

export class RestController<T extends BaseEntity> {
	protected service: BaseService<T>;

	@Get('/')
	public async findAll(): Promise<T[]> {
		return this.service.findAll();
	}

	@Get('/:id')
	public async findOne(@Param('id') id: string) {
		return this.service.findOneById(id);
	}

	@Post('/')
	public async create(@Body() data: DeepPartial<T>): Promise<T> {
		return this.service.create(data);
	}

	@Put('/:id')
	public async update(@Body() data: DeepPartial<T>): Promise<T> {
		return this.service.update(data);
	}

	@Patch('/:id')
	public async patch(@Param('id') id: string, @Body() data: DeepPartial<T>): Promise<T> {
		return this.service.patch(id, data);
	}

	@Delete('/:id')
	public async delete(@Param('id') id: string): Promise<DeleteResult> {
		return this.service.delete(id);
	}
}
