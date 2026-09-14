import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module.js';
import { UserManagementModule } from './user-management/user-management.module.js';
import { ProjectManagementModule } from './project-management/project-management.module.js';
import { LeadManagementModule } from './lead-management/lead-management.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UserManagementModule,
    ProjectManagementModule,
    LeadManagementModule,
  ],
})
export class AppModule {}
