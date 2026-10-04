import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model.js';
import { UserRole } from './models/user-role.enum.js';
import { UserPasswordHasherService } from './authentication/user-password-hasher.service.js';
import { Lead } from '../lead-management/models/lead.model.js';
import { Project } from '../project-management/models/project.model.js';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Lead) private readonly leadModel: typeof Lead,
    @InjectModel(Project) private readonly projectModel: typeof Project,
    private readonly passwordHasher: UserPasswordHasherService,
  ) {}

  async onModuleInit() {
    try {
      await this.seedUsers();
      await this.seedLeads();
      await this.seedProjects();
    } catch (err: any) {
      this.logger.warn(`Error al inicializar semillas en base de datos: ${err.message}`);
    }
  }

  private async seedUsers() {
    const adminEmail = 'admin@codeah.com';
    const existingAdmin = await this.userModel.findOne({ where: { email: adminEmail } });

    if (!existingAdmin) {
      const hashedPassword = await this.passwordHasher.hashPassword('password123');
      await this.userModel.create({
        name: 'Yutcelinis Henríquez',
        email: adminEmail,
        password: hashedPassword,
        role: UserRole.ADMINISTRADOR,
        isActive: true,
      } as any);

      this.logger.log(`Usuario Administrador inicial creado: ${adminEmail} / password123`);
    }

    const gestorEmail = 'carlos@codeah.com';
    const existingGestor = await this.userModel.findOne({ where: { email: gestorEmail } });
    if (!existingGestor) {
      const hashedPassword = await this.passwordHasher.hashPassword('password123');
      await this.userModel.create({
        name: 'Carlos Mendoza',
        email: gestorEmail,
        password: hashedPassword,
        role: UserRole.GESTOR_PROYECTOS,
        isActive: true,
      } as any);
    }
  }

  private async seedLeads() {
    const count = await this.leadModel.count();
    if (count === 0) {
      await this.leadModel.bulkCreate([
        {
          name: 'Martín Benítez',
          email: 'm.benitez@logistix.com',
          phone: '+54 9 11 4455-8899',
          company: 'Logistix Sur S.A.',
          serviceRequested: 'Integraciones y automatizaciones',
          status: 'PRESUPUESTADO',
          estimatedBudget: '4500 USD',
          message: 'Interesado en integración con AFIP y gestión de stock multialmacén.',
          source: 'web_contact_modal',
        },
        {
          name: 'Laura Gómez',
          email: 'laura@boutiquefashion.ar',
          phone: '+54 9 11 6622-1144',
          company: 'Boutique Fashion',
          serviceRequested: 'Desarrollo web y e-commerce',
          status: 'NUEVO',
          estimatedBudget: '2800 USD',
          message: 'Solicita rediseño web con catálogo rápido y pagos en cuotas.',
          source: 'web_contact_modal',
        },
      ] as any[]);
      this.logger.log('Leads iniciales sembrados en la API.');
    }
  }

  private async seedProjects() {
    const count = await this.projectModel.count();
    if (count === 0) {
      await this.projectModel.bulkCreate([
        {
          title: 'Portal de Facturación & Comprobantes Centralizados',
          description: 'Sistema web para la emisión de facturas electrónicas, gestión de clientes y reportes operativos.',
          status: 'EN_PROGRESO',
          budget: 8500,
          progress: 68,
          clientName: 'AgroServicios Central',
          dueDate: '2026-11-15',
          assignedTo: 'Carlos Mendoza',
        },
        {
          title: 'Rediseño E-commerce & Checkout Optimizado',
          description: 'Tienda Next.js con ultra velocidad, pasarela de pago personalizada e integración de inventario.',
          status: 'PLANIFICADO',
          budget: 3200,
          progress: 15,
          clientName: 'Boutique Fashion',
          dueDate: '2026-12-01',
          assignedTo: 'Sofía Rossi',
        },
      ] as any[]);
      this.logger.log('Proyectos iniciales sembrados en la API.');
    }
  }
}
