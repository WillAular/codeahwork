import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLeadDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'Formato de email inválido' })
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsNotEmpty({ message: 'El servicio requerido es obligatorio' })
  @IsString()
  serviceRequested: string;

  @IsOptional()
  @IsString()
  estimatedBudget?: string;

  @IsNotEmpty({ message: 'El mensaje es obligatorio' })
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  source?: string;
}
