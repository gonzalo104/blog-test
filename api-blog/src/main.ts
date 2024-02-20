import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

ConfigModule.forRoot({
  ignoreEnvFile: (process.env.NODE_ENV || 'development') !== 'development',
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix(configuration.prefix);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('EUGENIA API')
    .setDescription('EUGENIA API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${configuration.prefix}/docs`, app, document);

  await app.listen(configuration.port || 3000);
}
bootstrap();
