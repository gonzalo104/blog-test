import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule.register('postgres'), PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
