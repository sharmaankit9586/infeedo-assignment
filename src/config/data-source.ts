import { getConnectionManager } from 'typeorm';
import config from '.';
import { Task } from '../entities/Task';

const connectionManager = getConnectionManager();

const AppDataSource = connectionManager.create({
  type: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [Task],
  synchronize: true,
  logging: false,
  migrations: [`${process.cwd()}/src/migrations/*.js`],
});

export default AppDataSource;
