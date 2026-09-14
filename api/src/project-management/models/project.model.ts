import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  Default,
  AllowNull,
} from 'sequelize-typescript';
import { ProjectStatus } from './project-status.enum.js';
import { User } from '../../user-management/models/user.model.js';

@Table({
  tableName: 'projects',
  timestamps: true,
})
export class Project extends Model<Project> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING(150))
  declare title: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  declare description: string;

  @AllowNull(false)
  @Default(ProjectStatus.PLANEADO)
  @Column(DataType.ENUM(...Object.values(ProjectStatus)))
  declare status: ProjectStatus;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare managerId: number;

  @BelongsTo(() => User)
  declare manager: User;
}
