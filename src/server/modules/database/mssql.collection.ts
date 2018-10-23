import * as _ from 'lodash';
export class SQLCollection {
  private readonly connection;
  readonly tableName;
  constructor(sqlConnection: any, collectionName: string) {
    this.connection = sqlConnection;
    this.tableName = collectionName;
  }
  async all(opts: any) {
    return await this.connection.request.query(
      `select * from ${this.tableName}`,
    );
  }
  async lookupByKeys(_keys: string[]) {
    const keysString = _keys.reduce((str, val) => str + '\',\'' + val);
    return await this.connection.request.query(
      `select * from ${this.tableName} where _keys in ('${keysString}')`,
    );
  }
  async firstExample(bindVars: object) {}
  async save(body: any, opt: any) {}
  async update(_key: string, body: any, opt: any) {}
  async removeByKeys(_keys: string[], opt: any) {}
  async count() {}
  keysString(_keys: string[]) {
    return '\'' + _keys.reduce((str, val) => str + '\',\'' + val) + '\'';
  }
}
