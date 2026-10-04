import { LeadNotificationData } from './new-lead-admin.template.js';

export function getLeadConfirmationEmailTemplate(
  lead: LeadNotificationData,
  brandWebUrl: string = 'https://codeah.com.ar',
  whatsappNumber: string = '5491136490804',
): { subject: string; html: string; text: string } {
  const firstName = lead.name.split(' ')[0] || lead.name;
  const subject = `¡Recibimos tu consulta, ${firstName}! • Codeah Software Studio 🚀`;

  const text = `
¡Hola ${firstName}!

Muchas gracias por ponerte en contacto con Codeah Software Studio.

Confirmamos que hemos recibido tu solicitud sobre: "${lead.serviceRequested}".

RESUMEN DE TU CONSULTA:
- Servicio: ${lead.serviceRequested}
- Empresa: ${lead.company || 'No especificada'}
- Tu mensaje: "${lead.message}"

¿QUÉ SUCEDE AHORA?
1. Análisis técnico preliminar: Nuestro equipo de arquitectura evalúa tus requerimientos.
2. Contacto personalizado: En menos de 24 horas hábiles nos comunicaremos contigo vía WhatsApp o email para profundizar en tu caso.
3. Propuesta a medida: Te presentaremos una solución técnica sólida, plazos claros y cotización transparente.

Si tenés una consulta urgente o querés coordinar directamente una llamada, podés escribirnos a nuestro WhatsApp (+54 9 11 3649-0804):
https://wa.me/${whatsappNumber}

Atentamente,
El equipo de Codeah Software Studio
${brandWebUrl}
  `.trim();

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; -webkit-font-smoothing: antialiased; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.05);" cellspacing="0" cellpadding="0" border="0">
          
          <!-- Top Accent Line -->
          <tr>
            <td style="height: 5px; background: linear-gradient(90deg, #0c1938 0%, #1e3a8a 50%, #f59e0b 100%);"></td>
          </tr>

          <!-- Header Section with Logo -->
          <tr>
            <td style="padding: 36px 36px 28px 36px; background-color: #ffffff; border-bottom: 1px solid #f1f5f9; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <img src="cid:codeah-logo@codeah.com" alt="Codeah" width="175" style="display: block; max-width: 175px; height: auto;" />
                  </td>
                </tr>
              </table>
              <p style="margin: 8px 0 0 0; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1.2px;">
                Software a Medida & Integraciones
              </p>
              
              <div style="margin-top: 20px; display: inline-block; padding: 6px 16px; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 999px;">
                <span style="font-size: 12px; font-weight: 700; color: #047857;">
                  ✓ Solicitud Recibida en Nuestro Sistema
                </span>
              </div>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px;">
              <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 800; color: #0c1938; letter-spacing: -0.5px;">
                ¡Hola ${firstName}!
              </h1>
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #334155; line-height: 1.6;">
                Muchas gracias por ponerte en contacto con <strong>Codeah</strong>. Confirmamos que hemos recibido tu solicitud sobre <strong style="color: #b45309;">${lead.serviceRequested}</strong>.
              </p>
              <p style="margin: 0 0 28px 0; font-size: 15px; color: #64748b; line-height: 1.6;">
                Nuestro equipo de consultores y arquitectos de software ya está analizando tus requerimientos técnicos para preparar una respuesta orientada a tu objetivo de negocio.
              </p>

              <!-- Summary Box -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 32px;">
                <div style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px;">
                  📋 Resumen de tu solicitud
                </div>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 13px;">
                  <tr>
                    <td style="padding: 4px 0; color: #64748b; width: 35%;">Servicio:</td>
                    <td style="padding: 4px 0; color: #b45309; font-weight: 700;">${lead.serviceRequested}</td>
                  </tr>
                  ${
                    lead.company
                      ? `<tr>
                    <td style="padding: 4px 0; color: #64748b;">Empresa:</td>
                    <td style="padding: 4px 0; color: #0f172a; font-weight: 600;">${lead.company}</td>
                  </tr>`
                      : ''
                  }
                  <tr>
                    <td style="padding: 4px 0; color: #64748b;">Teléfono:</td>
                    <td style="padding: 4px 0; color: #0f172a;">${lead.phone || 'No especificado'}</td>
                  </tr>
                </table>
                <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #334155; font-style: italic;">
                  "${lead.message}"
                </div>
              </div>

              <!-- Next Steps Roadmap -->
              <div style="margin-bottom: 32px;">
                <div style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 16px;">
                  🧭 ¿Qué sucede ahora?
                </div>
                
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="vertical-align: top; width: 28px; padding-bottom: 16px;">
                      <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #fef3c7; border: 1px solid #fde68a; color: #b45309; font-size: 11px; font-weight: 800; text-align: center; line-height: 20px;">1</div>
                    </td>
                    <td style="padding-left: 10px; padding-bottom: 16px;">
                      <div style="font-size: 14px; font-weight: 700; color: #0c1938;">Evaluación de Viabilidad & Arquitectura</div>
                      <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Analizamos la escala del proyecto y la tecnología adecuada.</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="vertical-align: top; width: 28px; padding-bottom: 16px;">
                      <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #e0f2fe; border: 1px solid #bae6fd; color: #0369a1; font-size: 11px; font-weight: 800; text-align: center; line-height: 20px;">2</div>
                    </td>
                    <td style="padding-left: 10px; padding-bottom: 16px;">
                      <div style="font-size: 14px; font-weight: 700; color: #0c1938;">Contacto Personalizado (< 24 hs hábiles)</div>
                      <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Nos comunicamos por WhatsApp o email para despejar dudas puntuales.</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="vertical-align: top; width: 28px;">
                      <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #ecfdf5; border: 1px solid #a7f3d0; color: #047857; font-size: 11px; font-weight: 800; text-align: center; line-height: 20px;">3</div>
                    </td>
                    <td style="padding-left: 10px;">
                      <div style="font-size: 14px; font-weight: 700; color: #0c1938;">Propuesta a Medida & Plan de Trabajo</div>
                      <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Presupuesto transparente y etapas de desarrollo sin compromiso.</div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Urgent WhatsApp CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 10px;">
                <tr>
                  <td align="center">
                    <a href="https://wa.me/${whatsappNumber}?text=Hola%20equipo%20de%20Codeah,%20acabo%20de%20enviar%20una%20consulta%20por%20la%20web" target="_blank" style="display: inline-block; background-color: #10b981; color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 13px 26px; border-radius: 12px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);">
                      💬 ¿Consulta urgente? Escribinos al +54 9 11 3649-0804
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b; line-height: 1.6;">
              <strong style="color: #0c1938;">Codeah Software Studio</strong> &bull; Soluciones tecnológicas a medida<br />
              <a href="${brandWebUrl}" style="color: #b45309; text-decoration: none; font-weight: 600;">codeah.com.ar</a> &bull; 
              <a href="mailto:contacto@codeah.com.ar" style="color: #64748b; text-decoration: none;">contacto@codeah.com.ar</a><br />
              <span style="font-size: 11px; color: #94a3b8;">Buenos Aires, Argentina</span>
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
