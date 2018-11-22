import { Module, Inject, OnModuleDestroy , OnModuleInit} from '@nestjs/common';
import { databaseProviders } from './database.providers';
import {  MSSQL_CONNECTION_TOKEN} from '../../server.constants';
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule implements OnModuleDestroy, OnModuleInit{
  constructor(@Inject(MSSQL_CONNECTION_TOKEN) private readonly dbConnection: any) {}

	public onModuleDestroy(): void {
		this.dbConnection.close();
  }
  public onModuleInit(): void {
		// console.log('conn initing');
	}
}
