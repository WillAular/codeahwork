import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'node:fs';
import path from 'node:path';
import nodemailer, { Transporter } from 'nodemailer';
import {
  getNewLeadAdminEmailTemplate,
  LeadNotificationData,
} from './templates/new-lead-admin.template.js';
import { getLeadConfirmationEmailTemplate } from './templates/lead-confirmation.template.js';

@Injectable()
export class EmailNotificationService {
  private readonly logger = new Logger(EmailNotificationService.name);
  private transporter: Transporter | null = null;

  constructor(private readonly configService: ConfigService) {}

  /**
   * Obtiene la referencia del logo oficial para adjuntarlo como imagen inline (CID).
   */
  private getLogoAttachment() {
    const candidatePaths = [
      path.join(process.cwd(), 'assets', 'logo-codeah.png'),
      path.join(process.cwd(), 'dist', 'assets', 'logo-codeah.png'),
      path.join(process.cwd(), '..', 'web', 'public', 'logo-codeah.png'),
    ];

    for (const filePath of candidatePaths) {
      if (fs.existsSync(filePath)) {
        return {
          filename: 'logo-codeah.png',
          path: filePath,
          cid: 'codeah-logo@codeah.com',
        };
      }
    }

    return null;
  }

  /**
   * Verifica si las credenciales de correo están configuradas en el entorno.
   */
  isConfigured(): boolean {
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASS');
    return Boolean(user && pass && user.trim() !== '' && pass.trim() !== '');
  }

  /**
   * Obtiene o inicializa el transporte nodemailer reutilizable.
   */
  private getTransporter(): Transporter | null {
    if (!this.isConfigured()) {
      return null;
    }

    if (!this.transporter) {
      const host = this.configService.get<string>('SMTP_HOST') || 'smtp.gmail.com';
      const port = Number(this.configService.get<number>('SMTP_PORT')) || 465;
      const secure =
        this.configService.get<string>('SMTP_SECURE') === 'true' || port === 465;
      const user = this.configService.get<string>('SMTP_USER')!;
      const pass = this.configService.get<string>('SMTP_PASS')!;

      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
      });
    }

    return this.transporter;
  }

  /**
   * Envía la alerta interna del nuevo prospecto al administrador/equipo de Codeah.
   */
  async sendNewLeadAlert(lead: LeadNotificationData): Promise<boolean> {
    if (!this.isConfigured()) {
      this.logger.warn(
        `[Email Notification] SMTP no configurado (SMTP_USER/SMTP_PASS vacíos). Omitiendo alerta por email para lead #${lead.id}.`,
      );
      return false;
    }

    const transporter = this.getTransporter();
    if (!transporter) return false;

    const fromAddress =
      this.configService.get<string>('NOTIFICATION_EMAIL_FROM') ||
      `"Codeah CRM" <${this.configService.get<string>('SMTP_USER')}>`;
    const toAddress =
      this.configService.get<string>('NOTIFICATION_EMAIL_TO') ||
      this.configService.get<string>('SMTP_USER')!;
    const adminUrl =
      this.configService.get<string>('ADMIN_URL') ||
      this.configService.get<string>('DOMAIN') ||
      'https://codeah.com.ar';

    const normalizedAdminUrl = adminUrl.startsWith('http')
      ? adminUrl
      : `https://${adminUrl}`;

    const { subject, html, text } = getNewLeadAdminEmailTemplate(
      lead,
      normalizedAdminUrl,
    );

    const logoAttachment = this.getLogoAttachment();
    const attachments = logoAttachment ? [logoAttachment] : [];

    try {
      const info = await transporter.sendMail({
        from: fromAddress,
        to: toAddress,
        replyTo: lead.email,
        subject,
        text,
        html,
        attachments,
      });

      this.logger.log(
        `[Email Notification] Alerta de nuevo lead #${lead.id} enviada a ${toAddress} (MsgID: ${info.messageId})`,
      );
      return true;
    } catch (error: any) {
      this.logger.error(
        `[Email Notification] Error enviando alerta para lead #${lead.id}: ${error.message}`,
        error.stack,
      );
      return false;
    }
  }

  /**
   * Envía confirmación automática de recepción al cliente (si está habilitado en configuración).
   */
  async sendClientConfirmation(lead: LeadNotificationData): Promise<boolean> {
    const isEnabled =
      this.configService.get<string>('ENABLE_CLIENT_CONFIRMATION_EMAIL') !== 'false';

    const hasValidEmail =
      Boolean(lead.email) &&
      typeof lead.email === 'string' &&
      lead.email.includes('@') &&
      !lead.email.toLowerCase().includes('no especificado');

    if (!isEnabled || !this.isConfigured() || !hasValidEmail) {
      if (!hasValidEmail) {
        this.logger.log(
          `[Email Notification] Lead #${lead.id} no posee un correo válido (${lead.email}). Omitiendo confirmación al cliente.`,
        );
      }
      return false;
    }

    const transporter = this.getTransporter();
    if (!transporter) return false;

    const smtpUser = this.configService.get<string>('SMTP_USER')!;
    const fromAddress =
      this.configService.get<string>('NOTIFICATION_EMAIL_FROM') ||
      `"Codeah Software Studio" <${smtpUser}>`;

    const adminEmail =
      this.configService.get<string>('NOTIFICATION_EMAIL_TO') || smtpUser;

    const brandWebUrl =
      this.configService.get<string>('DOMAIN') ||
      this.configService.get<string>('ADMIN_URL') ||
      'https://codeah.com.ar';

    const normalizedBrandUrl = brandWebUrl.startsWith('http')
      ? brandWebUrl
      : `https://${brandWebUrl}`;

    const rawWhatsapp =
      this.configService.get<string>('CODEAH_WHATSAPP_NUMBER') || '5491136490804';
    const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, '') || '5491136490804';

    const { subject, html, text } = getLeadConfirmationEmailTemplate(
      lead,
      normalizedBrandUrl,
      cleanWhatsapp,
    );

    const logoAttachment = this.getLogoAttachment();
    const attachments = logoAttachment ? [logoAttachment] : [];

    try {
      const info = await transporter.sendMail({
        from: fromAddress,
        to: lead.email,
        replyTo: adminEmail,
        subject,
        text,
        html,
        attachments,
      });

      this.logger.log(
        `[Email Notification] Confirmación de consulta enviada al cliente ${lead.email} (MsgID: ${info.messageId})`,
      );
      return true;
    } catch (error: any) {
      this.logger.error(
        `[Email Notification] Error enviando confirmación al cliente ${lead.email}: ${error.message}`,
      );
      return false;
    }
  }

  /**
   * Método de diagnóstico para probar credenciales SMTP desde la API.
   */
  async testConnection(targetEmail?: string): Promise<{ success: boolean; message: string; details?: any }> {
    if (!this.isConfigured()) {
      return {
        success: false,
        message: 'Faltan variables SMTP_USER y/o SMTP_PASS en el archivo .env',
      };
    }

    const transporter = this.getTransporter();
    if (!transporter) {
      return {
        success: false,
        message: 'No se pudo inicializar el transporte SMTP',
      };
    }

    try {
      // 1. Probar handshake SMTP con el servidor (Gmail, etc.)
      await transporter.verify();

      // 2. Si se solicitó enviar un correo de prueba, lo enviamos
      const destination =
        targetEmail ||
        this.configService.get<string>('NOTIFICATION_EMAIL_TO') ||
        this.configService.get<string>('SMTP_USER')!;

      const fromAddress =
        this.configService.get<string>('NOTIFICATION_EMAIL_FROM') ||
        `"Codeah CRM Test" <${this.configService.get<string>('SMTP_USER')}>`;

      const logoAttachment = this.getLogoAttachment();
      const attachments = logoAttachment ? [logoAttachment] : [];

      const info = await transporter.sendMail({
        from: fromAddress,
        to: destination,
        subject: '🧪 [Prueba Exitosa] Configuración de Correo Codeah CRM',
        text: '¡Tu servidor SMTP está correctamente configurado y listo para recibir alertas de leads en Modo Claro!',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 32px 16px; background-color: #f1f5f9; text-align: center;">
            <div style="max-width: 520px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: left;">
              <div style="margin-bottom: 20px;">
                <img src="cid:codeah-logo@codeah.com" alt="Codeah" width="150" style="display: block; max-width: 150px; height: auto;" />
              </div>
              <div style="display: inline-block; padding: 4px 12px; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 999px; color: #047857; font-size: 12px; font-weight: 700; margin-bottom: 12px;">
                ✓ Conexión SMTP Verificada
              </div>
              <h2 style="margin: 0 0 10px 0; color: #0c1938; font-size: 20px;">Plantillas en Modo Claro Activas</h2>
              <p style="color: #475569; font-size: 14px; line-height: 1.5; margin: 0 0 16px 0;">
                Este es un correo de prueba enviado desde <strong>Codeah API</strong>. Tus credenciales de Gmail/SMTP y la imagen del logotipo están funcionando correctamente.
              </p>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 16px; font-size: 12px; color: #64748b;">
                Destino de prueba: <strong style="color: #0c1938;">${destination}</strong><br />
                Fecha: ${new Date().toLocaleString('es-AR')}
              </div>
            </div>
          </div>
        `,
        attachments,
      });

      return {
        success: true,
        message: `Conexión SMTP verificada y correo de prueba enviado a ${destination}`,
        details: { messageId: info.messageId },
      };
    } catch (error: any) {
      this.logger.error(`[Email Notification] Fallo al verificar SMTP: ${error.message}`);
      return {
        success: false,
        message: `Error al conectar con el servidor SMTP: ${error.message}`,
        details: error,
      };
    }
  }
}
