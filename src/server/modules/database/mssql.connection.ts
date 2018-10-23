import { ConnectionPool } from 'mssql';
import { SQLCollection } from './mssql.collection';

export class MsSQLConnection extends ConnectionPool {
  private readonly connection: ConnectionPool;
  private readonly sqlCollections: Map<string, SQLCollection>;
  constructor(cfg: any) {
    super(cfg);
    this.connection = this;
    this.connection.on('error', err => {
      console.log(err);
    });
    this.sqlCollections = new Map<string, SQLCollection>();
  }
  collection(collectionName: string) {
    const sqlCollection = this.sqlCollections.get(collectionName);
    if (!sqlCollection) {
      this.sqlCollections.set(
        collectionName,
        new SQLCollection(this.connection, collectionName),
      );
    }
    return this.sqlCollections.get(collectionName);
  }

}
