import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ProjectStatus } from '../models/project-status.enum.js';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsInt()
  managerId?: number;
}
