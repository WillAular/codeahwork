import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './models/project.model.js';
import { User } from '../user-management/models/user.model.js';
import { UserRole } from '../user-management/models/user-role.enum.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';

@Injectable()
export class ProjectManagementService {
  constructor(
    @InjectModel(Project)
    private readonly projectModel: typeof Project,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createProject(dto: CreateProjectDto): Promise<Project> {
    const manager = await this.userModel.findByPk(dto.managerId);
    if (!manager || !manager.isActive) {
      throw new BadRequestException(
        `Gestor con ID ${dto.managerId} no existe o está inactivo`,
      );
    }

    if (
      manager.role !== UserRole.GESTOR_PROYECTOS &&
      manager.role !== UserRole.ADMINISTRADOR
    ) {
      throw new BadRequestException(
        `El usuario asignado debe ser gestor de proyectos o administrador`,
      );
    }

    return this.projectModel.create({
      title: dto.title,
      description: dto.description ?? '',
      status: dto.status,
      managerId: dto.managerId,
    } as any);
  }

  async findProjectsForUser(currentUser: User): Promise<Project[]> {
    const isMasterAdmin = currentUser.role === UserRole.ADMINISTRADOR;

    const whereClause = isMasterAdmin
      ? {}
      : { managerId: currentUser.id };

    return this.projectModel.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'manager',
          attributes: ['id', 'name', 'email', 'role'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findProjectById(id: number, currentUser: User): Promise<Project> {
    const project = await this.projectModel.findByPk(id, {
      include: [
        {
          model: User,
          as: 'manager',
          attributes: ['id', 'name', 'email', 'role'],
        },
      ],
    });

    if (!project) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }

    const isMasterAdmin = currentUser.role === UserRole.ADMINISTRADOR;
    const isAssignedManager = project.managerId === currentUser.id;

    if (!isMasterAdmin && !isAssignedManager) {
      throw new ForbiddenException(
        'No tiene permisos para acceder a este proyecto',
      );
    }

    return project;
  }

  async updateProject(
    id: number,
    dto: UpdateProjectDto,
    currentUser: User,
  ): Promise<Project> {
    const project = await this.findProjectById(id, currentUser);
    const isMasterAdmin = currentUser.role === UserRole.ADMINISTRADOR;

    if (!isMasterAdmin && dto.managerId && dto.managerId !== project.managerId) {
      throw new ForbiddenException(
        'Sólo el administrador puede reasignar el gestor del proyecto',
      );
    }

    if (dto.managerId) {
      const newManager = await this.userModel.findByPk(dto.managerId);
      if (!newManager || !newManager.isActive) {
        throw new BadRequestException(
          `Gestor con ID ${dto.managerId} no existe o está inactivo`,
        );
      }
    }

    if (dto.title !== undefined) project.title = dto.title;
    if (dto.description !== undefined) project.description = dto.description;
    if (dto.status !== undefined) project.status = dto.status;
    if (dto.managerId !== undefined) project.managerId = dto.managerId;

    await project.save();
    return project;
  }

  async deleteProject(id: number): Promise<{ message: string }> {
    const project = await this.projectModel.findByPk(id);
    if (!project) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }

    await project.destroy();
    return { message: `Proyecto con ID ${id} eliminado exitosamente` };
  }
}
