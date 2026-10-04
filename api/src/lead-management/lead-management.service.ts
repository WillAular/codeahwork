import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lead } from './models/lead.model.js';
import { CreateLeadDto } from './dto/create-lead.dto.js';
import { UpdateLeadStatusDto } from './dto/update-lead-status.dto.js';
import { EmailNotificationService } from '../notifications/email-notification.service.js';

@Injectable()
export class LeadManagementService {
  constructor(
    @InjectModel(Lead)
    private readonly leadModel: typeof Lead,
    private readonly emailNotificationService: EmailNotificationService,
  ) {}

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    const newLead = await this.leadModel.create({
      name: createLeadDto.name.trim(),
      email: createLeadDto.email.trim().toLowerCase(),
      phone: createLeadDto.phone?.trim() || 'No especificado',
      company: createLeadDto.company?.trim() || null,
      serviceRequested: createLeadDto.serviceRequested || 'General',
      estimatedBudget: createLeadDto.estimatedBudget || null,
      message: createLeadDto.message?.trim() || 'Sin mensaje adicional',
      source: createLeadDto.source || 'web_contact_modal',
    } as any);

    // Logging for real-time visibility in server logs
    console.log(`[NUEVO LEAD REGISTRADO EN BD] #${newLead.id} - ${newLead.name} (${newLead.email}) - ${newLead.serviceRequested}`);

    // Disparar las 2 notificaciones por email en paralelo (al Admin y al Cliente)
    const leadNotificationData = {
      id: newLead.id,
      name: newLead.name,
      email: newLead.email,
      phone: newLead.phone,
      company: newLead.company,
      serviceRequested: newLead.serviceRequested,
      estimatedBudget: newLead.estimatedBudget,
      message: newLead.message,
      source: newLead.source,
      createdAt: newLead.createdAt,
    };

    Promise.allSettled([
      this.emailNotificationService.sendNewLeadAlert(leadNotificationData),
      this.emailNotificationService.sendClientConfirmation(leadNotificationData),
    ]).catch((err) => {
      console.error('[LeadManagementService] Error inesperado en despacho de emails:', err);
    });

    return newLead;
  }

  async testEmail(targetEmail?: string) {
    return this.emailNotificationService.testConnection(targetEmail);
  }

  async findAll(): Promise<Lead[]> {
    return this.leadModel.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number): Promise<Lead> {
    const lead = await this.leadModel.findByPk(id);
    if (!lead) {
      throw new NotFoundException(`Lead con ID #${id} no encontrado`);
    }
    return lead;
  }

  async updateStatus(id: number, updateDto: UpdateLeadStatusDto): Promise<Lead> {
    const lead = await this.findOne(id);
    lead.status = updateDto.status;
    await lead.save();
    return lead;
  }

  async remove(id: number): Promise<void> {
    const lead = await this.findOne(id);
    await lead.destroy();
  }
}
