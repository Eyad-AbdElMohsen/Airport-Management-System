import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const dbConfig = {
    useFactory: async (configService: ConfigService): Promise<SequelizeModuleOptions> => ({
        dialect: 'postgres',
        uri: configService.get<string>('DB_URL'),
        autoLoadModels: true,
        synchronize: true,
        sync: { alter: true }, // Update existing database schema
        // sync: { alter: true, force: true } // Uncomment to drop and recreate DB (use with caution)
    }),
    inject: [ConfigService],
};