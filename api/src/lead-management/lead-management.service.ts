import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lead } from './models/lead.model.js';
import { CreateLeadDto } from './dto/create-lead.dto.js';
import { UpdateLeadStatusDto } from './dto/update-lead-status.dto.js';

@Injectable()
export class LeadManagementService {
  constructor(
    @InjectModel(Lead)
    private readonly leadModel: typeof Lead,
  ) {}

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    const newLead = await this.leadModel.create({
      ...createLeadDto,
      source: createLeadDto.source || 'web_contact_modal',
    } as any);

    // Logging for real-time visibility in server logs
    console.log(`[NUEVO LEAD REGISTRADO] #${newLead.id} - ${newLead.name} (${newLead.email}) - ${newLead.serviceRequested}`);
    return newLead;
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
