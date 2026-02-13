export const prerender = false;
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const MAX_BODY_SIZE = 10 * 1024 * 1024; // 10MB

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    const contentLength = parseInt(request.headers.get('content-length') || '0', 10);

    if (contentLength > MAX_BODY_SIZE) {
      return new Response(
        JSON.stringify({ error: 'Bestand te groot. Maximum 10MB.' }),
        { status: 413, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let naam = '';
    let telefoon = '';
    let email = '';
    let bericht = '';
    let honeypot = '';
    const attachments: { filename: string; content: Buffer }[] = [];

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();

      honeypot = (formData.get('website') as string) || '';
      naam = (formData.get('naam') as string) || '';
      telefoon = (formData.get('telefoon') as string) || '';
      email = (formData.get('email') as string) || '';
      bericht = (formData.get('klusBeschrijving') as string) || (formData.get('bericht') as string) || '';

      const fotos = formData.getAll('fotos');
      for (const foto of fotos) {
        if (foto instanceof File && foto.size > 0) {
          const buffer = Buffer.from(await foto.arrayBuffer());
          attachments.push({
            filename: foto.name || 'foto.jpg',
            content: buffer,
          });
        }
      }
    } else {
      const body = await request.json();
      naam = body.naam || '';
      telefoon = body.telefoon || '';
      email = body.email || '';
      bericht = body.bericht || body.klusBeschrijving || '';
      honeypot = body.website || '';
    }

    // Honeypot check
    if (honeypot) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!naam || !telefoon || !bericht) {
      return new Response(
        JSON.stringify({ error: 'Vul alle verplichte velden in.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const fotoInfo = attachments.length > 0
      ? `<p><strong>Foto's:</strong> ${attachments.length} bijlage(n)</p>`
      : '';

    await resend.emails.send({
      from: 'SLIM Website <onboarding@resend.dev>',
      to: 'slim.klussen@gmail.com',
      subject: `Nieuwe offerte-aanvraag van ${escapeHtml(naam)}`,
      html: `
        <h2 style="color: #1a1a1a;">Nieuwe aanvraag via de website</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #334155; border-bottom: 1px solid #e2e8f0;">Naam</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(naam)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #334155; border-bottom: 1px solid #e2e8f0;">Telefoon</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;"><a href="tel:${escapeHtml(telefoon)}">${escapeHtml(telefoon)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #334155; border-bottom: 1px solid #e2e8f0;">E-mail</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : 'Niet opgegeven'}</td>
          </tr>
        </table>
        <br />
        <p style="font-weight: bold; color: #334155;">Beschrijving klus:</p>
        <p style="background: #f8fafc; padding: 12px 16px; border-radius: 8px; border-left: 3px solid #ffcd00;">${escapeHtml(bericht).replace(/\n/g, '<br />')}</p>
        ${fotoInfo}
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #e2e8f0;" />
        <p style="color: #94a3b8; font-size: 12px;">Verzonden via slim-klussen.be</p>
      `,
      ...(attachments.length > 0 && { attachments }),
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Er ging iets mis bij het verzenden.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
