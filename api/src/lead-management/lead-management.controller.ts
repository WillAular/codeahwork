import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LeadManagementService } from './lead-management.service.js';
import { CreateLeadDto } from './dto/create-lead.dto.js';
import { UpdateLeadStatusDto } from './dto/update-lead-status.dto.js';

@Controller('leads')
export class LeadManagementController {
  constructor(private readonly leadService: LeadManagementService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadService.create(createLeadDto);
  }

  @Post('test-email')
  @HttpCode(HttpStatus.OK)
  testEmail(@Body('email') email?: string) {
    return this.leadService.testEmail(email);
  }

  @Get()
  findAll() {
    return this.leadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.leadService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateLeadStatusDto,
  ) {
    return this.leadService.updateStatus(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.leadService.remove(id);
  }
}
