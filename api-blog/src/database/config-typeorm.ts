import configuration from '../config/configuration';
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: configuration.databases.postgres.host,
  port: Number(configuration.databases.postgres.port),
  username: configuration.databases.postgres.username,
  password: configuration.databases.postgres.password,
  database: configuration.databases.postgres.database,
  entities: [__dirname + '../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
