abstract class BaseService {
  abstract collection: any;

  async getAll(opts: any): Promise<any[]> {
    const rst: any = await this.collection.all(opts);
    return rst._result;
  }
  async getByKey(_key: string): Promise<any> {
    const rst: any[] = await this.collection.lookupByKeys([_key]);
    return rst[0];
  }
  async getByKeys(_key: string[]): Promise<any> {
    return await this.collection.lookupByKeys([..._key]);
  }
  async getByBindVars(bindVars: object): Promise<any> {
    return await this.collection.firstExample(bindVars);
  }
  async updateBykey(_key: string, body: any, opts: any): Promise<any> {
    return await this.collection.update(_key, body, opts);
  }
  async insertOne(body: any): Promise<any> {
    return await this.collection.save(body, { returnNew: true });
  }
  // async insertList(list: any[]): Promise<any[]> { }
  async deleteOne(_key: string): Promise<any> {
    return await this.collection.removeByKeys([_key], {});
  }
  async deleteByKeys(_keys: string[]): Promise<any> {
    return await this.collection.removeByKeys([..._keys], {});
  }
  async count(): Promise<any> {
    return await this.collection.count();
  }
}
