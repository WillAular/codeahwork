import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../user-management/models/user.model.js';
import { Project } from '../project-management/models/project.model.js';
import { Lead } from '../lead-management/models/lead.model.js';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('DB_HOST', '127.0.0.1'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME', 'codeah_user'),
        password: configService.get<string>('DB_PASSWORD', 'codeah_password'),
        database: configService.get<string>('DB_NAME', 'codeah_db'),
        models: [User, Project, Lead],
        autoLoadModels: true,
        synchronize: true,
        logging: configService.get<string>('NODE_ENV') === 'development' ? console.log : false,
      }),
    }),
  ],
})
export class DatabaseModule {}
