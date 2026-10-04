import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lead } from './models/lead.model.js';
import { LeadManagementService } from './lead-management.service.js';
import { LeadManagementController } from './lead-management.controller.js';
import { NotificationsModule } from '../notifications/notifications.module.js';

@Module({
  imports: [
    SequelizeModule.forFeature([Lead]),
    NotificationsModule,
  ],
  controllers: [LeadManagementController],
  providers: [LeadManagementService],
  exports: [LeadManagementService],
})
export class LeadManagementModule {}
