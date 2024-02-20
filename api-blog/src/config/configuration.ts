import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  ignoreEnvFile: (process.env.NODE_ENV || 'development') !== 'development',
});

export default {
  port: parseInt(process.env.PORT, 10) || 3000,
  prefix: '/api/v1',
  environment: process.env.NODE_ENV || 'development',
  databases: {
    postgres: {
      host: process.env['POSTGRES_HOST'],
      port: process.env['POSTGRES_PORT'] || 5432,
      username: process.env['POSTGRES_USER'],
      password: process.env['POSTGRES_PASSWORD'],
      database: process.env['POSTGRES_DATABASE'],
    },
  },
};
