export interface LeadNotificationData {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  serviceRequested: string;
  estimatedBudget?: string | null;
  message: string;
  source: string;
  createdAt?: Date;
}

export function getNewLeadAdminEmailTemplate(
  lead: LeadNotificationData,
  adminBaseUrl: string = 'https://codeah.com.ar',
): { subject: string; html: string; text: string } {
  const cleanPhone = (lead.phone || '').replace(/[^0-9+]/g, '');
  const waPhone = cleanPhone.startsWith('+') ? cleanPhone.replace('+', '') : cleanPhone;
  const waMessage = encodeURIComponent(
    `Hola ${lead.name}, te escribo del equipo de Codeah respecto a tu consulta por ${lead.serviceRequested}. ¿Cómo estás?`,
  );
  const waUrl = waPhone ? `https://wa.me/${waPhone}?text=${waMessage}` : null;
  const leadAdminUrl = `${adminBaseUrl.replace(/\/$/, '')}/admin/leads/${lead.id}`;
  const formattedDate = (lead.createdAt ? new Date(lead.createdAt) : new Date()).toLocaleString('es-AR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Argentina/Buenos_Aires',
  });

  const subject = `🚀 [Nuevo Lead #${lead.id}] ${lead.name} • ${lead.serviceRequested}`;

  const text = `
CODEAH CRM • ALERTA DE NUEVO PROSPECTO (MODO CLARO)
==================================================
ID: #${lead.id}
Fecha: ${formattedDate}
Servicio Solicitado: ${lead.serviceRequested}

DATOS DEL CLIENTE:
- Nombre: ${lead.name}
- Empresa: ${lead.company || 'Particular / No informada'}
- Email: ${lead.email}
- Teléfono: ${lead.phone || 'No especificado'}
- Presupuesto Estimado: ${lead.estimatedBudget || 'A convenir'}
- Origen del Lead: ${lead.source}

MENSAJE DEL CLIENTE:
"${lead.message}"

ACCIONES RÁPIDAS:
👉 Ver en Panel Admin: ${leadAdminUrl}
${waUrl ? `💬 Contactar por WhatsApp: ${waUrl}` : ''}
✉️ Responder por Email: mailto:${lead.email}
==================================================
  `.trim();

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; -webkit-font-smoothing: antialiased; line-height: 1.5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f1f5f9; padding: 36px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 620px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);" cellspacing="0" cellpadding="0" border="0">
          
          <!-- Top Brand Accent Bar -->
          <tr>
            <td style="height: 5px; background: linear-gradient(90deg, #0c1938 0%, #1e3a8a 50%, #f59e0b 100%);"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; background-color: #ffffff; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="left" style="vertical-align: middle;">
                    <img src="cid:codeah-logo@codeah.com" alt="Codeah" width="155" style="display: block; max-width: 155px; height: auto;" />
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="display: inline-block; padding: 5px 12px; font-size: 11px; font-weight: 800; color: #b45309; background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.5px;">
                      ⚡ Alerta Lead #${lead.id}
                    </span>
                  </td>
                </tr>
              </table>

              <h1 style="margin: 22px 0 6px 0; font-size: 22px; font-weight: 800; color: #0c1938; letter-spacing: -0.5px;">
                ¡Nuevo prospecto desde la Web!
              </h1>
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                ${formattedDate}
              </p>
            </td>
          </tr>

          <!-- Quick Action Buttons Bar -->
          <tr>
            <td style="padding: 16px 32px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="left">
                    <a href="${leadAdminUrl}" target="_blank" style="display: inline-block; background-color: #0c1938; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; padding: 10px 18px; border-radius: 10px; box-shadow: 0 2px 8px rgba(12, 25, 56, 0.15);">
                      👉 Gestionar en Admin
                    </a>
                    ${
                      waUrl
                        ? `&nbsp;&nbsp;<a href="${waUrl}" target="_blank" style="display: inline-block; background-color: #10b981; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; padding: 10px 18px; border-radius: 10px; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);">
                      💬 Abrir WhatsApp
                    </a>`
                        : ''
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px;">

              <!-- Lead Details Table -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border-radius: 14px; border: 1px solid #e2e8f0; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td style="padding: 13px 18px; border-bottom: 1px solid #e2e8f0; width: 34%; font-size: 12px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                    👤 Cliente
                  </td>
                  <td style="padding: 13px 18px; border-bottom: 1px solid #e2e8f0; font-size: 15px; color: #0c1938; font-weight: 800;">
                    ${lead.name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 13px 18px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                    🏢 Empresa
                  </td>
                  <td style="padding: 13px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #334155; font-weight: 600;">
                    ${lead.company || '<span style="color: #94a3b8; font-style: italic;">No informada</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 13px 18px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                    📧 Email
                  </td>
                  <td style="padding: 13px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px;">
                    <a href="mailto:${lead.email}" style="color: #2563eb; text-decoration: none; font-weight: 700;">
                      ${lead.email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 13px 18px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                    📱 Teléfono
                  </td>
                  <td style="padding: 13px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0f172a; font-weight: 600;">
                    ${lead.phone || '<span style="color: #94a3b8;">No especificado</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 13px 18px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                    💼 Servicio
                  </td>
                  <td style="padding: 13px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #b45309; font-weight: 800;">
                    ${lead.serviceRequested}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 13px 18px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                    💰 Presupuesto
                  </td>
                  <td style="padding: 13px 18px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0f172a; font-weight: 600;">
                    ${lead.estimatedBudget || '<span style="color: #64748b;">A convenir</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 13px 18px; font-size: 12px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                    🌐 Origen
                  </td>
                  <td style="padding: 13px 18px; font-size: 13px; color: #475569; font-family: monospace;">
                    ${lead.source}
                  </td>
                </tr>
              </table>

              <!-- Client Message Box -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
                  Mensaje del Cliente
                </div>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #f59e0b; border-radius: 12px; padding: 18px 22px; font-size: 14px; color: #334155; line-height: 1.6; font-style: italic;">
                  "${lead.message}"
                </div>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b;">
              <span style="font-weight: 700; color: #0c1938;">Codeah Software Studio</span> &bull; Notificación interna del CRM<br />
              <span style="font-size: 11px; color: #94a3b8;">Para responder al cliente, hacé clic en "Responder" directamente en este correo.</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return { subject, html, text };
}
