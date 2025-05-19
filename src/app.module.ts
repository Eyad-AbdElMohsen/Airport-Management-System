import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConfig } from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      ...dbConfig
    }),
  ], controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
