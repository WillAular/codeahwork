import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectManagementService } from './project-management.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { RolesAuthGuard } from '../user-management/authentication/roles-auth.guard.js';
import { Roles } from '../user-management/authentication/roles.decorator.js';
import { UserRole } from '../user-management/models/user-role.enum.js';
import { CurrentUser } from '../user-management/authentication/current-user.decorator.js';
import { User } from '../user-management/models/user.model.js';
import { Project } from './models/project.model.js';

@Controller('projects')
@UseGuards(RolesAuthGuard)
export class ProjectManagementController {
  constructor(
    private readonly projectService: ProjectManagementService,
  ) {}

  @Post()
  @Roles(UserRole.ADMINISTRADOR)
  async createProject(@Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectService.createProject(dto);
  }

  @Get()
  @Roles(UserRole.ADMINISTRADOR, UserRole.GESTOR_PROYECTOS)
  async getProjects(@CurrentUser() currentUser: User): Promise<Project[]> {
    return this.projectService.findProjectsForUser(currentUser);
  }

  @Get(':id')
  @Roles(UserRole.ADMINISTRADOR, UserRole.GESTOR_PROYECTOS)
  async getProjectById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: User,
  ): Promise<Project> {
    return this.projectService.findProjectById(id, currentUser);
  }

  @Patch(':id')
  @Roles(UserRole.ADMINISTRADOR, UserRole.GESTOR_PROYECTOS)
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProjectDto,
    @CurrentUser() currentUser: User,
  ): Promise<Project> {
    return this.projectService.updateProject(id, dto, currentUser);
  }

  @Delete(':id')
  @Roles(UserRole.ADMINISTRADOR)
  async deleteProject(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.projectService.deleteProject(id);
  }
}
