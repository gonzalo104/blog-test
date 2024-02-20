import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config-typeorm';

export const databaseProviders = [
  {
    provide: 'postgres',
    useFactory: async (): Promise<any> => {
      return;
    },
    imports: [TypeOrmModule.forRoot(config)],
  },
];
