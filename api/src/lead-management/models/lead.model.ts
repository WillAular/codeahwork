import {
  Column,
  DataType,
  Model,
  Table,
  Default,
  AllowNull,
} from 'sequelize-typescript';
import { LeadStatus } from './lead-status.enum.js';

@Table({
  tableName: 'leads',
  timestamps: true,
})
export class Lead extends Model<Lead> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING(150))
  declare name: string;

  @AllowNull(false)
  @Column(DataType.STRING(150))
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  declare phone: string;

  @AllowNull(true)
  @Column(DataType.STRING(150))
  declare company: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  declare serviceRequested: string;

  @AllowNull(true)
  @Column(DataType.STRING(50))
  declare estimatedBudget: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  declare message: string;

  @AllowNull(false)
  @Default(LeadStatus.NUEVO)
  @Column(DataType.ENUM(...Object.values(LeadStatus)))
  declare status: LeadStatus;

  @AllowNull(false)
  @Default('web_contact_modal')
  @Column(DataType.STRING(50))
  declare source: string;
}
