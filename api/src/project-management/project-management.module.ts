import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './models/project.model.js';
import { User } from '../user-management/models/user.model.js';
import { ProjectManagementService } from './project-management.service.js';
import { ProjectManagementController } from './project-management.controller.js';
import { UserManagementModule } from '../user-management/user-management.module.js';

@Module({
  imports: [
    SequelizeModule.forFeature([Project, User]),
    UserManagementModule,
  ],
  controllers: [ProjectManagementController],
  providers: [ProjectManagementService],
  exports: [ProjectManagementService],
})
export class ProjectManagementModule {}
