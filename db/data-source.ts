import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'portfolios',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
