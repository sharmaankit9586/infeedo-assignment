import { DataSource, getConnectionManager } from 'typeorm';
import config from '.';
import AppDataSource from './data-source';

class Db {
  private _dataSource: DataSource;

  async connect() {
    this._dataSource = await AppDataSource.initialize();
  }

  get source() {
    return this._dataSource;
  }
}

export default new Db();
