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
      useFactory: (configService: ConfigService) => {
        const dialect = (configService.get<string>('DB_DIALECT') || (configService.get('DB_HOST') ? 'mysql' : 'sqlite')) as any;

        if (dialect === 'sqlite') {
          return {
            dialect: 'sqlite',
            storage: configService.get<string>('DB_STORAGE', './codeah.sqlite'),
            models: [User, Project, Lead],
            autoLoadModels: true,
            synchronize: true,
            logging: false,
          };
        }

        return {
          dialect: 'mysql',
          host: configService.get<string>('DB_HOST', '127.0.0.1'),
          port: Number(configService.get('DB_PORT', 33066)),
          username: configService.get<string>('DB_USERNAME', 'root'),
          password: configService.get<string>('DB_PASSWORD', 'root'),
          database: configService.get<string>('DB_NAME', 'codeah'),
          models: [User, Project, Lead],
          autoLoadModels: true,
          synchronize: true,
          logging: configService.get<string>('NODE_ENV') === 'development' ? console.log : false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
