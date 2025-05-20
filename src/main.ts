import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.useGlobalPipes(
      new ValidationPipe({ transform: true, forbidNonWhitelisted: true }),
    );

    const sequelize = app.get(Sequelize);
    await sequelize.sync();
    console.log('Connected to database...');

    await app.listen(3000);
    console.log('Application is running: http://localhost:3000');
  } catch (err) {
    console.log('Failed to bootstrap the application', err);
    process.exit(1);
  }
}

bootstrap().catch((err) => {
  console.error('Bootstrap error:', err);
});
