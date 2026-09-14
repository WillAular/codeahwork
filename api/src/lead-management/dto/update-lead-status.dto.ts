import { IsEnum, IsNotEmpty } from 'class-validator';
import { LeadStatus } from '../models/lead-status.enum.js';

export class UpdateLeadStatusDto {
  @IsNotEmpty()
  @IsEnum(LeadStatus, { message: 'Estado de lead inválido' })
  status: LeadStatus;
}
