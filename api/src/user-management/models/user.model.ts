import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  Default,
  AllowNull,
  Unique,
} from 'sequelize-typescript';
import { UserRole } from './user-role.enum.js';
import { Project } from '../../project-management/models/project.model.js';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  declare name: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(150))
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare password: string;

  @AllowNull(false)
  @Default(UserRole.GESTOR_PROYECTOS)
  @Column(DataType.ENUM(...Object.values(UserRole)))
  declare role: UserRole;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  declare isActive: boolean;

  @HasMany(() => Project)
  declare managedProjects: Project[];
}
